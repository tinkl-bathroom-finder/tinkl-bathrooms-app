
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
/*sql*/
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "restrooms";
DROP TABLE IF EXISTS "comments";
DROP TABLE IF EXISTS "comment_votes";
DROP TABLE IF EXISTS "images";
DROP TABLE IF EXISTS "restroom_votes";
DROP TABLE IF EXISTS "restroom_visits";

DROP TRIGGER IF EXISTS "set_timestamp" ON "restrooms";
DROP TRIGGER IF EXISTS "set_timestamp" ON "comments";
DROP FUNCTION IF EXISTS "update_updated_on_restrooms";

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
	"name" VARCHAR,
	"street" VARCHAR,
	"city" VARCHAR,
	"state" VARCHAR,
	"accessible" BOOLEAN DEFAULT FALSE,
	"unisex" BOOLEAN DEFAULT FALSE,
	"directions" TEXT,
	"latitude" FLOAT(8),
	"longitude" FLOAT(8),
	"created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	"updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	"country" VARCHAR,
	"changing_table" BOOLEAN DEFAULT FALSE,
	"is_removed" BOOLEAN DEFAULT FALSE,
	"is_single_stall" BOOLEAN DEFAULT FALSE,
	"is_multi_stall" BOOLEAN DEFAULT FALSE,
	"is_flagged" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "comments" (
	"id" SERIAL PRIMARY KEY,
	"content" text,
	"restroom_id" INTEGER REFERENCES "restrooms" ON DELETE CASCADE,
	"user_id"  INTEGER REFERENCES "user" ON DELETE CASCADE,
	"is_removed" BOOLEAN DEFAULT FALSE,
	"is_flagged" BOOLEAN DEFAULT FALSE,
	"inserted_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW().
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

CREATE TABLE "images" (
	"id" SERIAL PRIMARY KEY,
	"source" VARCHAR,
	"user_id" INTEGER REFERENCES "user" ON DELETE CASCADE,
	"restroom_id" INTEGER REFERENCES "restrooms" ON DELETE CASCADE,
	"is_removed" BOOLEAN DEFAULT FALSE,
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

CREATE TABLE "restroom_visits" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user" ON DELETE CASCADE,
	"restroom_id" INTEGER REFERENCES "restrooms" ON DELETE CASCADE,
	"inserted_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	"updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "test_restrooms" (
	"latitude" DECIMAL(10, 8),
	"longitude" DECIMAL(11, 8)
	);
	
	-- gets information details about a certain bathroom
	    SELECT 
	    "restrooms"."name", "restrooms"."street", "restrooms"."city", "restrooms"."state", "restrooms"."updated_at", "restrooms"."accessible", "restrooms"."unisex", SUM("restroom_votes"."upvote") AS "upvotes", SUM ("restroom_votes"."downvote") AS "downvotes", "comments"."content"
    FROM "restrooms"
     LEFT JOIN "comments" ON "restrooms"."id"="comments"."restroom_id"
     LEFT JOIN "restroom_votes" ON "restrooms"."id"="restroom_votes"."restroom_id"
    WHERE "restrooms"."id"=47878
    GROUP BY "restrooms"."id", "comments"."content";
    
-- uses the Haversine formula to calculate distance from the given origin
        	    select id, name, street, city, distance from (
    SELECT
    id,
    name,
    street,
    city,
    latitude,
    longitude,
    (
        6371 * acos(cos(radians(44)) * 
        cos(radians(latitude)) * 
        cos(radians(longitude) - 
        radians(-93)) + 
        sin(radians(44)) * 
        sin(radians(latitude)))
    ) AS distance

  FROM
    restrooms)
  ORDER BY
    distance
  LIMIT 10;
  
      SELECT 
    "restrooms"."name", "restrooms"."street", "restrooms"."city", "restrooms"."state", "restrooms"."updated_at", "restrooms"."accessible", "restrooms"."unisex", SUM("restroom_votes"."upvote") AS "upvotes", SUM ("restroom_votes"."downvote") AS "downvotes", "comments"."content"
  FROM "restrooms"
   LEFT JOIN "comments" ON "restrooms"."id"="comments"."restroom_id"
   LEFT JOIN "restroom_votes" ON "restrooms"."id"="restroom_votes"."restroom_id"
  WHERE "restrooms"."id"=4
  GROUP BY "restrooms"."id", "comments"."content";
  
  SELECT
  "comments"."content", "comments"."inserted_at", "comments"."restroom_id", "restrooms"."name"
  FROM "comments"
  LEFT JOIN "restrooms" ON "comments"."restroom_id"="restrooms"."id"
  WHERE "user_id" = 1;
  
   SELECT
    "comments"."content", "comments"."inserted_at", "restrooms"."name", "comments"."restroom_id", "comments"."id" AS "comment_id"
    FROM "comments"
    LEFT JOIN "restrooms" ON "comments"."restroom_id"="restrooms"."id"
    WHERE "user_id" = 1 AND "comments"."is_removed" = FALSE;
    	
  DELETE from "restrooms"
  WHERE "id" = 43381;
  
  INSERT INTO "restrooms"
	("id", "name", "street", "city", "state", "accessible", "unisex", "directions", "latitude", "longitude", "created_at", "updated_at", "country", "changing_table")
	VALUES
	($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);
	
SELECT 
    "restrooms"."name", 
    "restrooms"."street", 
    "restrooms"."city", 
    "restrooms"."state", 
    "restrooms"."updated_at", 
    "restrooms"."accessible", 
    "restrooms"."unisex", 
    "restrooms"."is_single_stall", 
    SUM("restroom_votes"."upvote") AS "upvotes", 
    SUM ("restroom_votes"."downvote") AS "downvotes", 
    "comments"."content" AS "comments"
  FROM "restrooms"
   LEFT JOIN "comments" ON "restrooms"."id"="comments"."restroom_id"
   LEFT JOIN "restroom_votes" ON "restrooms"."id"="restroom_votes"."restroom_id"
  WHERE "restrooms"."id"=47878 
  	AND "restrooms"."is_removed"=false 
  	AND "comments"."is_removed"=false
  GROUP BY "restrooms"."id", "comments"."content";
  
  SELECT
  		JSON_AGG("comments"."content") AS "comments",
  		"comments"."user_id"
  	FROM "comments"
  	WHERE "restroom_id"=47878
  	GROUP BY "comments".user_id;
	
    SELECT 
    "restrooms"."name", "restrooms"."street", "restrooms"."city", "restrooms"."state", "restrooms"."updated_at", "restrooms"."accessible", "restrooms"."unisex", "restrooms"."changing_table", SUM("restroom_votes"."upvote") AS "upvotes", SUM ("restroom_votes"."downvote") AS "downvotes", "comments"."content"
  FROM "restrooms"
   LEFT JOIN "comments" ON "restrooms"."id"="comments"."restroom_id"
   LEFT JOIN "restroom_votes" ON "restrooms"."id"="restroom_votes"."restroom_id"
  WHERE "restrooms"."id"=47878 AND "restrooms"."is_removed"=false AND "comments"."is_removed"=false
  GROUP BY "restrooms"."id", "comments"."content";
  
SELECT *
FROM "comments"
WHERE content ~ 'single';

UPDATE "comments"
SET content = REPLACE(content, '^', E'%\'%');

UPDATE "restrooms" 
	SET "unisex" = TRUE
	FROM "comments" 
	WHERE "comments"."restroom_id" = "restrooms"."id"
	AND "comments".content ~ 'unisex';
	
	SELECT * FROM "comments" 
	WHERE "restroom_id" = 1693;
	
	  SELECT 
    "restrooms"."name", "restrooms"."street", "restrooms"."city", "restrooms"."state", "restrooms"."updated_at", "restrooms"."accessible", "restrooms"."unisex", "restrooms"."changing_table", "restrooms"."is_single_stall", SUM("restroom_votes"."upvote") AS "upvotes", SUM ("restroom_votes"."downvote") AS "downvotes", "comments"."content"
  FROM "restrooms"
   LEFT JOIN "comments" ON "restrooms"."id"="comments"."restroom_id"
   LEFT JOIN "restroom_votes" ON "restrooms"."id"="restroom_votes"."restroom_id"
  WHERE "restrooms"."id"=1974
  GROUP BY "restrooms"."id", "comments"."content";
  
  
  SELECT DISTINCT *,
  ROW_NUMBER() OVER (
  ORDER BY restrooms.street
  )
  FROM (
  SELECT DISTINCT street
  FROM restrooms
  )
  restrooms;
  
  SELECT DISTINCT name
  FROM "restrooms";
  
  SELECT "restrooms".name, "comments".content 
  FROM "restrooms" 
	INNER JOIN "comments" ON "comments"."restroom_id"="restrooms"."id"
	WHERE "comments"."restroom_id" = "restrooms"."id"
	AND "comments".content ~ 'single';
	
SELECT * FROM "restrooms"
	GROUP BY "restrooms".name, "restrooms".id;
	
SELECT * FROM (
	SELECT *, 
	ROW_NUMBER() OVER (PARTITION BY "restrooms".name) AS ROW_NUMBER
	FROM "restrooms") AS ROWS
	WHERE ROW_NUMBER = 1 AND "is_removed"=FALSE
	ORDER BY "id" ASC;
	
UPDATE "restrooms"
	SET "state" = 'MN'
	WHERE "state" = 'MINNESOTA ';
	
	-- Selects name and street for rows where both name and street are distinct
	SELECT DISTINCT * FROM (
	SELECT "restrooms".name, "restrooms".street
	FROM "restrooms") AS OUTPUT;
	
CREATE FUNCTION update_updated_at_restrooms()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "restrooms"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_restrooms();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "comments"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_restrooms();
    
    SELECT * FROM (
    	SELECT ROW_NUMBER() OVER (PARTITION BY "restrooms".street) AS ROW_NUMBER, "restrooms".id, "restrooms".street, "restrooms".accessible, "restrooms".changing_table, "restrooms".city, "restrooms".is_single_stall, "restroom_votes".upvote as upvote
    	FROM "restrooms") 
    	AS ROWS
   		LEFT JOIN "restroom_votes" ON "restrooms"."id"="restroom_votes"."restroom_id"
    	WHERE ROW_NUMBER = 1 AND "is_removed"=FALSE
    	ORDER BY "id" asc
    	LIMIT 100;
    	
  SELECT "restrooms".name, "comments".content 
  FROM "restrooms" 
	INNER JOIN "comments" ON "comments"."restroom_id"="restrooms"."id"
	WHERE "comments"."restroom_id" = "restrooms"."id"
	AND "comments".content ~ 'posh';
	
	  INSERT INTO "comments"
	("content", "restroom_id", "user_id")
	VALUES
	('This is a test, testing updated_at trigger', 2, 1);
	
	UPDATE "restrooms" 
	SET "street" = '350 S. 5th St'
	WHERE id = 2;
	
	    SELECT 
    "restrooms"."name", "restrooms"."street", "restrooms"."city", "restrooms"."state", "restrooms"."updated_at", "restrooms"."accessible", "restrooms"."unisex", "restrooms"."changing_table", "restrooms"."is_single_stall", SUM("restroom_votes"."upvote") AS "upvotes", SUM ("restroom_votes"."downvote") AS "downvotes", "comments"."content", "comments"."inserted_at"
  FROM "restrooms"
   LEFT JOIN "comments" ON "restrooms"."id"="comments"."restroom_id"
   LEFT JOIN "restroom_votes" ON "restrooms"."id"="restroom_votes"."restroom_id"
  WHERE "restrooms"."id"=2
  GROUP BY "restrooms"."id", "comments"."content", "comments"."inserted_at";