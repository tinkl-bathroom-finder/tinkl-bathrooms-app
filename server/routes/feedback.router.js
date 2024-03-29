const express = require('express');
const pool = require('../modules/pool');
require('dotenv').config();
const router = express.Router();
const axios = require('axios');

// POST /feedback/comments
router.post('/', (req, res) => {
    console.log('req.body:', req.body);
    const voteQuery = `
    INSERT INTO "restroom_votes"
        ("upvote", "downvote", "restroom_id", "user_id")
        VALUES
        ($1, $2, $3, $4);
        `;
    const voteValues = [
        req.body.upvote,
        req.body.downvote,
        req.body.restroom_id,
        req.body.user_id
    ];
    // first query inserts upvote or downvote into restroom_votes table
    pool.query(voteQuery, voteValues)
        .then(result => {
            if (req.body.comment.length) {
                const commentQuery = `
                INSERT INTO "comments"
                    ("content", "restroom_id", "user_id")
                    VALUES
                    ($1, $2, $3);
                `;
                const commentValues = [
                    req.body.comment,
                    req.body.restroom_id,
                    req.body.user_id
                ];
                // second query inserts comments into corresponding table
                pool.query(commentQuery, commentValues)
                    .then(result => {
                        //if both are successful, send back successful 201 message
                        res.sendStatus(201)
                    })
            } else {
                res.sendStatus(201)
            }

        })
        .catch(err => {
            console.log("Error adding feedback:", err)
            res.sendStatus(500)
        })
});


module.exports = router;
