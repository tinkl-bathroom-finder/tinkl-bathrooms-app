const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/* GET route for specific bathroom information */
router.get("/:id", (req, res) => {
  const query = `
    SELECT 
    "restrooms"."name", "restrooms"."street", "restrooms"."city", "restrooms"."state", "restrooms"."updated_at", "restrooms"."accessible", "restrooms"."unisex", "restrooms"."changing_table", "restrooms"."is_single_stall", SUM("restroom_votes"."upvote") AS "upvotes", SUM ("restroom_votes"."downvote") AS "downvotes", "comments"."content", "comments"."inserted_at"
  FROM "restrooms"
   LEFT JOIN "comments" ON "restrooms"."id"="comments"."restroom_id"
   LEFT JOIN "restroom_votes" ON "restrooms"."id"="restroom_votes"."restroom_id"
  WHERE "restrooms"."id"=$1
  GROUP BY "restrooms"."id", "comments"."content", "comments"."inserted_at";
    `;
  const values = [req.params.id];
  pool
    .query(query, values)
    .then((dbRes) => {
      let theBathroom = formatBathroomObject(dbRes.rows);
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
  let bathroom = {};

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
  bathroom.comments = [];

  for (let row of bathroomRows) {
    bathroom.comments.push(row.content);
  }
  return bathroom;
}

module.exports = router;
