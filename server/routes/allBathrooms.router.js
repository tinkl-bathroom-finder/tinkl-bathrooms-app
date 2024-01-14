const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET all bathrooms route
  const query = `SELECT * FROM "restrooms"
  WHERE "is_removed"=FALSE;`;

  pool
    .query(query)
    .then((dbRes) => {
      console.log("dbRes.rows in GET /all route:", dbRes);
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log("fail:", dbErr);
      res.sendStatus(500);
    });
});

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
  pool
    .query(formattedQueryText)
    .then((result) => {
      const restroom_id_array = result.rows;

      const commentQuery = formatCommmentsQuery(
        req.body,
        restroom_id_array
      );
      console.log("commentQuery:", commentQuery);

      pool
        .query(commentQuery)
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log("Error with comments post: ", err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log("Error in /bathrooms POST", err);
      res.sendStatus(500);
    });
});

function formatCommmentsQuery(BA, restroomIdArray) {
  console.log("BA: ", BA);
  console.log("restroomIdArray: ", restroomIdArray);
  // for (let i = 0; i < BA.length; i++) {
  //   BA[i].directions.replace(/'/g, "''");
  // }
  let commentsQuery = `
INSERT INTO "comments"
("content", "restroom_id", "inserted_at")
VALUES
`;
  for (let i = 0; i < BA.length; i++) {
    if (i < BA.length - 1) {
      console.log("BA[i]: ", BA[i]);
      console.log("restroomIdArray[i]: ", restroomIdArray[i]);
      commentsQuery += `
    ('${BA[i].directions.replace(/'/g, "&") || ''}', 
    ${restroomIdArray[i].id}, 
    '${BA[i].created_at}'), `;
    } else if (i < BA.length) {
      commentsQuery += `
      ('${BA[i].directions.replace(/'/g, "&") || ''} ', 
      ${restroomIdArray[i].id}, 
      '${BA[i].created_at}');
  `;
    }

    console.log("commentsQuery:", commentsQuery);
  }
  return commentsQuery;
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
  (${BA[i].id}, '${BA[i].name.replace(/'/g, "&") || ''}', '${BA[i].street.replace(/'/g, "&") || ''}', '${BA[i].city}', '${BA[i].state}', ${BA[i].accessible}, ${BA[i].unisex}, ${BA[i].latitude}, ${BA[i].longitude}, '${BA[i].created_at}', '${BA[i].updated_at}', '${BA[i].country}', ${BA[i].changing_table}),
  `;
    } else if (i < BA.length) {
      bathroomQuery += `  (${BA[i].id}, '${BA[i].name.replace(/'/g, "&") || ''}', '${BA[i].street.replace(/'/g, "&") || ''}', '${BA[i].city}', '${BA[i].state}', ${BA[i].accessible}, ${BA[i].unisex}, ${BA[i].latitude}, ${BA[i].longitude}, '${BA[i].created_at}', '${BA[i].updated_at}', '${BA[i].country}', ${BA[i].changing_table})
  RETURNING "id";`;
    }
  }
  return bathroomQuery;
}

module.exports = router;
