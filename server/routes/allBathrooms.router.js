const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const axios = require('axios');

/**
 * GET route template
 */
// router.get("/", (req, res) => {
//   // GET all bathrooms route
//   const query = /*sql*/`
//   SELECT 
//   "restrooms".*, 
//   SUM("restroom_votes"."upvote") AS "upvotes", 
//   SUM ("restroom_votes"."downvote") AS "downvotes"
// FROM "restrooms"
// LEFT JOIN "restroom_votes" ON "restrooms"."id"="restroom_votes"."restroom_id"
// WHERE "restrooms".is_removed = FALSE
// GROUP BY "restrooms"."id";`

//   pool
//     .query(query)
//     .then((dbRes) => {
//       // console.log("dbRes.rows in GET /all route:", dbRes);
//       res.send(dbRes.rows);
//     })
//     .catch((dbErr) => {
//       console.log("fail:", dbErr);
//       res.sendStatus(500);
//     });
// });

// PUT route for admin to soft "delete" a bathroom AKA turn "is_removed" to true
router.put("/:id", rejectUnauthenticated, (req, res) => {
  console.log("req.params.id from put route: ", req.params.id);
  const sqlQuery = `
  UPDATE "restrooms"
      SET "is_removed"=TRUE
      WHERE "id"=$1
  `;
  const sqlValues = [req.params.id];
  pool
    .query(sqlQuery, sqlValues)
    // this gets sent to deleteBathroom.saga.js
    .then((dbResult) => res.sendStatus(201))
    .catch((error) => {
      console.log("Error removing bathroom:", error);
      res.sendStatus(500);
    });
});

// DELETE route for admin to permanently a bathroom from the database
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  console.log("req.params.id from delete route: ", req.params.id);
  const sqlQuery = `
  DELETE from "restrooms"
  WHERE "id" = $1
  `;
  const sqlValues = [req.params.id];
  pool
    .query(sqlQuery, sqlValues)
    .then((dbResult) => {
      res.sendStatus(201);
    })
    .catch((dbError) => {
      console.log("DELETE /bathrooms/:id failed", dbError);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  const formattedQueryText = formatBathroomsQuery(req.body);
  console.log("formattedQueryText: ", formattedQueryText);
  // first query
  pool
    .query(formattedQueryText)
    .then((result) => {
      const restroom_id_array = result.rows;
      const commentQuery = formatCommmentsQuery(req.body, restroom_id_array);
      // second query
      pool
        .query(commentQuery)
        .then((result) => {
          const actualCommentQuery = formatActualCommmentsQuery(
            req.body,
            restroom_id_array
          )
          // third query
          pool
            .query(actualCommentQuery)
            .then((result) => {

              const formattedVotesQuery = formatVotesQuery(
                req.body, restroom_id_array)
              // fourth query
              pool
                .query(formattedVotesQuery)
                .then((result) => {
                  res.sendStatus(201);
                })
                // catch for fourth query
                .catch((err) => {
                  console.log("Error with votes post: ", err);
                  res.sendStatus(500);
                })
            })
            // catch for third query
            .catch((err) => {
              console.log("Error with comments post: ", err);
              res.sendStatus(500);
            })
        })
        // catch for the second (directions) query
        .catch((err) => {
          console.log("Error with directions post: ", err);
          res.sendStatus(500);
        });
    })
    // catch for first (restrooms) query
    .catch((err) => {
      console.log("Error in /bathrooms POST", err);
      res.sendStatus(500);
    })
})

function formatCommmentsQuery(BA, restroomIdArray) {

  let commentsQuery = `
INSERT INTO "comments"
("content", "restroom_id", "inserted_at")
VALUES
`;
  for (let i = 0; i < BA.length; i++) {
    if (BA[i].directions && i < BA.length - 1) {
      commentsQuery += `
    ('${BA[i].directions.replace(/'/g, "''") || ""}', 
    ${restroomIdArray[i].id}, 
    '${BA[i].created_at}'), `;
    } else if (BA[i].directions && i < BA.length) {
      commentsQuery += `
      ('${BA[i].directions.replace(/'/g, "''") || ""} ', 
      ${restroomIdArray[i].id}, 
      '${BA[i].created_at}'); 
  `;
    }

  } let finalCommentsQuery = commentsQuery.slice(0, -2)
  finalCommentsQuery += `;`
  console.log("commentsQuery:", commentsQuery);
  return finalCommentsQuery;
}



// function to insert comment into comments table
function formatActualCommmentsQuery(BA, restroomIdArray) {
  let actualCommentsQuery = `
INSERT INTO "comments"
("content", "restroom_id", "inserted_at")
VALUES
`;
  for (let i = 0; i < BA.length; i++) {
    if (BA[i].comment && i < BA.length - 1) {
      console.log("BA[i]: ", BA[i]);
      console.log("restroomIdArray[i]: ", restroomIdArray[i]);
      actualCommentsQuery += `
    ('${BA[i].comment.replace(/'/g, "''") || ""}', 
    ${restroomIdArray[i].id}, 
    '${BA[i].created_at}'), `;
    } else if (BA[i].comment && i < BA.length) {
      actualCommentsQuery += `
      ('${BA[i].comment.replace(/'/g, "''") || ""} ', 
      ${restroomIdArray[i].id}, 
      '${BA[i].created_at}'); 
  `;
    }

  } let finalCommentsQuery = actualCommentsQuery.slice(0, -2)
  finalCommentsQuery += `;`
  console.log("finalCommentsQuery:", finalCommentsQuery);
  return finalCommentsQuery;
}

function formatBathroomsQuery(BA) {
  let bathroomQuery = `
INSERT INTO "restrooms"
("api_id", "name", "street", "city", "state", "accessible", "unisex", "latitude", "longitude", "created_at", "updated_at", "country", "changing_table")
VALUES
`;
  for (let i = 0; i < BA.length; i++) {
    if (i < BA.length - 1) {
      bathroomQuery += `
  (${BA[i].id}, '${BA[i].name.replace(/'/g, "''") || ""}', '${BA[i].street.replace(/'/g, "''") || ""
        }', '${BA[i].city}', '${BA[i].state}', ${BA[i].accessible}, ${BA[i].unisex
        }, ${BA[i].latitude}, ${BA[i].longitude}, '${BA[i].created_at}', '${BA[i].updated_at
        }', '${BA[i].country}', ${BA[i].changing_table}),
  `;
    } else if (i < BA.length) {
      bathroomQuery += `  (${BA[i].id}, '${BA[i].name.replace(/'/g, "''") || ""
        }', '${BA[i].street.replace(/'/g, "''") || ""}', '${BA[i].city}', '${BA[i].state
        }', ${BA[i].accessible}, ${BA[i].unisex}, ${BA[i].latitude}, ${BA[i].longitude
        }, '${BA[i].created_at}', '${BA[i].updated_at}', '${BA[i].country}', ${BA[i].changing_table
        })
  RETURNING "id";`;
    }
  }
  return bathroomQuery;
}




const formatVotesQuery = (array, restroom_id_array) => {
  let votesQuery = `
  INSERT INTO "restroom_votes"
  ("restroom_id", "upvote", "downvote", "inserted_at")
  VALUES 
  `;
  for (let i = 0; i < array.length; i++) {
    if (array[i].upvote && i < array.length - 1) {
      votesQuery += `
      (${restroom_id_array[i].id}, ${array[i].upvote}, ${array[i].downvote}, '${array[i].created_at}'), `
    } else if (array[i].downvote && i < array.length - 1) {
      votesQuery += `
      (${restroom_id_array[i].id}, ${array[i].upvote}, ${array[i].downvote}, '${array[i].created_at}'),  
      `
    }
  } let finalVotesQuery = votesQuery.slice(0, -2)
  finalVotesQuery += `;`
  console.log('finalVotesQuery: ', finalVotesQuery)
  return finalVotesQuery
}

// const formatUpVotesQuery = (array, restroomIdArray) => {
//   let votesQuery = `
//   INSERT INTO "restroom_votes"
//   ("restroom_id", "upvote", "inserted_at")
//   VALUES 
//   `;
//   for (let i=0; i<array.length; i++){
//     if (array[i].upvote && i < array.length - 1) {
//       votesQuery += `
//       (${restroomIdArray[i].id}, ${array[i].upvote}, '${array[i].created_at}'), 
//       `
//     } else if (array[i].upvote && i < array.length){
//       votesQuery += `
//       (${restroomIdArray[i].id}, ${array[i].upvote}, '${array[i].created_at}'); 
//       `
//     }
// } 
// return votesQuery
// }

// const formatDownVotesQuery = (array, restroomIdArray) => {
//   let votesQuery = `
//   INSERT INTO "restroom_votes"
//   ("restroom_id", "downvote", "inserted_at")
//   VALUES 
//   `;
//   for (let i=0; i<array.length; i++){
//     if (array[i].downvote && i < array.length - 1) {
//       votesQuery += `
//       (${restroomIdArray[i].id}, ${array[i].downvote}, '${array[i].created_at}'), 
//       `
//     } else if (array[i].downvote && i < array.length){
//       votesQuery += `
//       (${restroomIdArray[i].id}, ${array[i].downvote}, '${array[i].created_at}'); 
//       `
//     }
// } return votesQuery
// }





module.exports = router;
