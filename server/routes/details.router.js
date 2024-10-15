const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/* GET route for specific bathroom information */
// In this modified query:

// We create subqueries (upvotes_query, downvotes_query, and comments_query) to aggregate data separately for upvotes, downvotes, and comments.
// We then left join these subqueries with the restrooms table using the restroom ID as the join condition.
// We use COALESCE to handle cases where there might be no upvotes, downvotes, or comments for a particular restroom, returning 0 for votes and an empty JSON array for comments in such cases.
router.get("/:id", (req, res) => {
  const query = /*sql*/`
  SELECT 
    "restrooms".*,
   "opening_hours".weekday_text,
   "opening_hours".day_0_open,
   "opening_hours".day_0_close,
   "opening_hours".day_1_open,
   "opening_hours".day_1_close,
   "opening_hours".day_2_open,
   "opening_hours".day_2_close,
   "opening_hours".day_3_open,
   "opening_hours".day_3_close,
   "opening_hours".day_4_open,
   "opening_hours".day_4_close,
   "opening_hours".day_5_open,
   "opening_hours".day_5_close,
   "opening_hours".day_6_open,
   "opening_hours".day_6_close, 
    COALESCE("votes_query"."upvotes", 0) AS "upvotes", 
    COALESCE("votes_query"."downvotes", 0) AS "downvotes",
    COALESCE("comments_query"."comments", '[]'::json) AS "comments"
      FROM "restrooms"

      LEFT JOIN (
            SELECT 
              "restroom_id", 
              SUM("upvote") AS "upvotes",
              SUM("downvote") AS "downvotes"
            FROM "restroom_votes"
            GROUP BY "restroom_id"
          ) 
          AS "votes_query" ON "restrooms"."id" = "votes_query"."restroom_id"
      
      LEFT JOIN (
            SELECT 
              "restroom_id",
              json_agg(
                json_build_object(
                  'id', comments.id,
                  'content', comments.content,
                  'user_id', comments.user_id,
                  'inserted_at', comments.inserted_at
                )
                order by "inserted_at" DESC
              ) 
              AS "comments"
                FROM "comments"
                WHERE "comments"."is_removed" = FALSE
                GROUP BY "comments"."restroom_id"
                ) 
                AS "comments_query" ON "restrooms"."id" = "comments_query"."restroom_id"
                
      LEFT JOIN "opening_hours" ON "restrooms".id="opening_hours".restroom_id
                WHERE "restrooms"."id" = $1;
    `;
  const values = [req.params.id];
  pool
    .query(query, values)
    .then((dbRes) => {
      res.send(dbRes.rows[0]);
    })
    .catch((dbErr) => {
      console.log("fail:", dbErr);
      res.sendStatus(500);
    });
});

module.exports = router;
