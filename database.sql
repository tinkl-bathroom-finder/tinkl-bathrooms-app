DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "restrooms";
DROP TABLE IF EXISTS "comments";
DROP TABLE IF EXISTS "comment_votes";
DROP TABLE IF EXISTS "restroom_votes";
DROP TABLE IF EXISTS "opening_hours";
DROP TABLE IF EXISTS "contact";

DROP TRIGGER IF EXISTS "trigger_update_updated_at_restrooms" ON "restrooms";
DROP TRIGGER IF EXISTS "trigger_update_updated_at_comments" ON "comments";
DROP TRIGGER IF EXISTS "trigger_update_updated_at_restroom_votes" ON "restroom_votes";
DROP FUNCTION IF EXISTS "update_updated_at_restrooms";

CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(100) UNIQUE NOT NULL,
	"password" VARCHAR(100),
	"is_admin" BOOLEAN DEFAULT FALSE,
	"is_removed" BOOLEAN DEFAULT FALSE,
	"inserted_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	"updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

SET TIMEZONE = 'America/Chicago'; 

CREATE TABLE "restrooms" (
	"id" SERIAL PRIMARY KEY,
	"api_id" VARCHAR,
	"place_id" VARCHAR,
	"name" VARCHAR,
	"street" VARCHAR,
	"city" VARCHAR,
	"state" VARCHAR,
	"formatted_address" VARCHAR,
	"is_removed" BOOLEAN DEFAULT FALSE,
	"accessible" BOOLEAN DEFAULT FALSE,
	"unisex" BOOLEAN DEFAULT FALSE,
	"changing_table" BOOLEAN DEFAULT FALSE,
	"is_single_stall" BOOLEAN DEFAULT FALSE,
	"has_menstrual_products" BOOLEAN DEFAULT FALSE,
	"latitude" FLOAT(8),
	"longitude" FLOAT(8),
	"created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	"updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	"country" VARCHAR,
	"is_flagged" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "comments" (
	"id" SERIAL PRIMARY KEY,
	"content" text,
	"restroom_id" INTEGER REFERENCES "restrooms" ON DELETE CASCADE,
	"user_id"  INTEGER REFERENCES "user" ON DELETE CASCADE,
	"is_removed" BOOLEAN DEFAULT FALSE,
	"is_flagged" BOOLEAN DEFAULT FALSE,
	"inserted_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	"updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "comment_votes" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user" ON DELETE CASCADE,
	"comment_id" INTEGER REFERENCES "comments" ON DELETE CASCADE,
	"vote" TEXT,
	"inserted_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	"updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "restroom_votes" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user" ON DELETE CASCADE,
	"restroom_id" INTEGER REFERENCES "restrooms" ON DELETE CASCADE,
	"upvote" INTEGER,
	"downvote" INTEGER,
	"inserted_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	"updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

  CREATE TABLE "opening_hours" (
	"id" SERIAL PRIMARY KEY,
	"restroom_id" INTEGER REFERENCES "restrooms" ON DELETE CASCADE,
	"business_status" text,
	"weekday_text" VARCHAR,
	"day_0_open" VARCHAR(4),
	"day_0_close" VARCHAR(4),
	"day_1_open" VARCHAR(4),
	"day_1_close" VARCHAR(4),
	"day_2_open" VARCHAR(4),
	"day_2_close" VARCHAR(4),
	"day_3_open" VARCHAR(4),
	"day_3_close" VARCHAR(4),
	"day_4_open" VARCHAR(4),
	"day_4_close" VARCHAR(4),
	"day_5_open" VARCHAR(4),
	"day_5_close" VARCHAR(4),
	"day_6_open" VARCHAR(4),
	"day_6_close" VARCHAR(4),
	"updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "flagged_restrooms" (
	"id" SERIAL PRIMARY KEY,
	"restroom_id" INTEGER REFERENCES "restrooms" ON DELETE CASCADE,
	"user_id" INTEGER REFERENCES "user" ON DELETE CASCADE,
	"api_id" VARCHAR,
	"name" VARCHAR,
	"address" VARCHAR,
	"accessible" BOOLEAN DEFAULT NULL,
	"changing_table" BOOLEAN DEFAULT NULL,
	"unisex" BOOLEAN DEFAULT NULL,
	"is_single_stall" BOOLEAN DEFAULT NULL,
	"is_permanently_closed" BOOLEAN DEFAULT NULL,
	"other_comment" VARCHAR,
	"created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	"updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	"resolved" BOOLEAN DEFAULT FALSE
);

	CREATE TABLE "contact" (
	"id" SERIAL PRIMARY KEY,
	"user_id"  INTEGER REFERENCES "user" ON DELETE CASCADE,
	"details" VARCHAR,
	"resolved" BOOLEAN DEFAULT FALSE,
	"inserted_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- function to update the restrooms updated_at column with a new timestamp of the current time upon being triggered
CREATE OR REPLACE FUNCTION update_updated_at_restrooms()
RETURNS TRIGGER AS $$
BEGIN
	IF TG_TABLE_NAME = 'comments' THEN
		UPDATE restrooms
    	SET updated_at = now()
    	WHERE id = NEW.restroom_id;
    ELSIF TG_TABLE_NAME = 'restroom_votes' THEN
		UPDATE restrooms
    	SET updated_at = now()
    	WHERE id = NEW.restroom_id;
    END IF;
    
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Attaches trigger function to restrooms table (will trigger update if info in the restrooms table is updated)
CREATE TRIGGER trigger_update_updated_at_restrooms
AFTER UPDATE ON restrooms
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_restrooms();

-- Attaches trigger function to comments table (will trigger update if a new comment is inserted)
CREATE TRIGGER trigger_update_updated_at_comments
AFTER INSERT ON comments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_restrooms();

-- Attaches trigger function to restroom_votes table (will trigger update if a new vote is posted/inserted)
CREATE TRIGGER trigger_update_updated_at_restroom_votes
AFTER INSERT ON restroom_votes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_restrooms();
