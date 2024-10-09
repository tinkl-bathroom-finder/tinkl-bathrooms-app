const express = require("express");
const pool = require("../modules/pool");
const reactRouterDom = require("react-router-dom");
const router = express.Router();

router.get("/", (req, res) => {
  pool.query(`SELECT * FROM "contact"`)
    .then((dbRes) => {
      res.send(dbRes.rows)
    })
    .catch((dbErr) => {
      console.error('Contact get route failed', dbErr)
      res.sendStatus(500)
    })
})

router.post("/", (req, res) => {
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

router.get("/", (req, res) => {
    const query = `
        SELECT
        "contact".user_id,
        "contact".details,
        "contact".id AS "comment_id",
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

module.exports = router
