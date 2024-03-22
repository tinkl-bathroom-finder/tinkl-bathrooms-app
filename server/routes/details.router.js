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
              ) 
              AS "comments"
                
                FROM "comments"
                WHERE "comments"."is_removed" = FALSE
                GROUP BY "comments"."restroom_id"
                ) 
                AS "comments_query" ON "restrooms"."id" = "comments_query"."restroom_id"
                WHERE "restrooms"."id" = $1;
    `;
  const values = [req.params.id];
  pool
    .query(query, values)
    .then((dbRes) => {
      const theBathroom = formatBathroomObject(dbRes.rows);
      console.log("BathroomObject:", theBathroom);
      // dbRes.rows aka theBathroom gets sent to details.saga.js
      res.send(theBathroom);
    })
    .catch((dbErr) => {
      console.log("fail:", dbErr);
      res.sendStatus(500);
    });
});

function formatBathroomObject(bathroomRows) {
  console.log('bathroomRows:', bathroomRows)
  const bathroom = {};

  bathroom.name = bathroomRows[0].name;
  bathroom.street = bathroomRows[0].street;
  bathroom.city = bathroomRows[0].city;
  bathroom.state = bathroomRows[0].state;
  bathroom.updated_at = bathroomRows[0].updated_at;
  bathroom.accessible = bathroomRows[0].accessible;
  bathroom.unisex = bathroomRows[0].unisex;
  bathroom.upvotes = bathroomRows[0].upvotes;
  bathroom.downvotes = bathroomRows[0].downvotes;
  bathroom.is_single_stall = bathroomRows[0].is_single_stall;
  bathroom.changing_table = bathroomRows[0].changing_table;
  bathroom.comments = bathroomRows[0].comments;

  return bathroom;
}

module.exports = router;
