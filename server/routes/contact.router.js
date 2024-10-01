const express = require("express");
const pool = require("../modules/pool");
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

module.exports = router
