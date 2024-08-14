const express = require("express");
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const router = express.Router();

/* GET route for user comments */
router.get("/:id", (req, res) => {
    const query = `
    SELECT
    "comments"."content", "comments"."inserted_at", "restrooms"."name", "comments"."restroom_id", "comments"."id" AS "comment_id"
    FROM "comments"
    LEFT JOIN "restrooms" ON "comments"."restroom_id"="restrooms"."id"
    WHERE "user_id" = $1 AND "comments"."is_removed" = FALSE
    ORDER BY
    "comments"."inserted_at" DESC
    ;
    `
    console.log("req.params from fetchUserComments router", req.params);
    const values = [req.params.id];
    pool
        .query(query, values)
        .then((dbRes) => {
            let commentsArray = dbRes.rows
            // gets sent to userComments.saga.js
            res.send(commentsArray);
        })
        .catch((dbErr) => {
            res.sendStatus(500);
        })
})

// PUT route for user to "delete" their comment AKA turn "is_removed" to true
router.put("/:id", rejectUnauthenticated, (req, res) => {
    console.log('req.params.id from put route: ', req.params.id)
    const sqlQuery = `
    UPDATE "comments"
        SET "is_removed"=TRUE
        WHERE ("comments"."id"=$1 AND "user_id"=$2)
        RETURNING "user_id"
    `
    const sqlValues = [req.params.id, req.user.id]
    pool
        .query(sqlQuery, sqlValues)
        .then((dbRes) => {
            // this gets sent to userComments.saga.ja
            let userId = dbRes.rows[0]
            console.log('dbRes.rows: ', dbRes.rows)
            console.log('user_id: ', userId)
            res.send(userId);
        })
        .catch((error) => {
            console.log('Error removing comment:', error);
            res.sendStatus(500)
        });
})

module.exports = router;