const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/* GET route for specific bathroom information */
router.get("/:id", (req, res) => {
    const query = `
    SELECT 
    "restrooms"."name", "restrooms"."street", "restrooms"."city", "restrooms"."state", "restrooms"."updated_at", "restrooms"."accessible", "restrooms"."unisex", SUM("restroom_votes"."upvote") AS "upvotes", SUM ("restroom_votes"."downvote") AS "downvotes", "comments"."content"
  FROM "restrooms"
   LEFT JOIN "comments" ON "restrooms"."id"="comments"."restroom_id"
   LEFT JOIN "restroom_votes" ON "restrooms"."id"="restroom_votes"."restroom_id"
  WHERE "restrooms"."id"=$1
  GROUP BY "restrooms"."id", "comments"."content";
    `;
    console.log("req.params", req.params);
    const values = [req.params.id];
    pool
      .query(query, values)
      .then((dbRes) => {
        let theBathroom = dbRes.rows;
        console.log('theBathroom:', theBathroom)
        console.log("dbRes.rows", dbRes.rows);
        // where is this getting sent to?? I need to get this info
        res.send(theBathroom);
      })
      .catch((dbErr) => {
        console.log("fail:", dbErr);
        res.sendStatus(500);
      });
  });

  module.exports = router;