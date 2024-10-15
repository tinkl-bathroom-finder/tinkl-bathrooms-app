const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const checkAdminAuth = require('../modules/checkAdminAuth');


router.get("/", rejectUnauthenticated, checkAdminAuth, (req, res) => {
    const query = `
        SELECT
        "contact".id AS "comment_id",
        "contact".user_id,
        "contact".details,
        "contact".resolved,
        "contact".inserted_at,
        "user".username
        FROM "contact"
        LEFT JOIN "user" on "contact".user_id = "user".id;
    `
    pool
        .query(query)
        .then((dbRes) => {
            res.send(dbRes.rows)
        })
        .catch((dbErr) => {
            res.sendStatus(500);
        })
})

router.post("/", rejectUnauthenticated, checkAdminAuth, (req, res) => {
  const query = `
    INSERT INTO "contact" (user_id, details)
    VALUES ($1, $2)
    `
  const values = [req.user.id, req.body.feedback]
  pool.query(query, values)
    .then((dbRes) => {
      res.sendStatus(201)
    })
    .catch((dbErr) => {
      console.error('Contact post route failed:', dbErr)
      res.sendStatus(500)
    })
})

router.put("/", rejectUnauthenticated, checkAdminAuth, (req, res) => {
    const query = `
    UPDATE "contact"
    SET "resolved" = TRUE
    WHERE "id" = $1
    `
    pool
        .query (query, [req.body.commentId])
        .then((dbRes) => {
            res.sendStatus(200)
        })
        .catch((dbErr) => {
            console.error('Contact put route failed:', dbErr)
            res.sendStatus(500)
        })
})

module.exports = router
