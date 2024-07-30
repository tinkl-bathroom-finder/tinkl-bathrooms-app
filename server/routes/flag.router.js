const express = require('express');
const pool = require('../modules/pool');
// require('dotenv').config();
const router = express.Router();
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// POST /flag/id
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('req.body', req.body);
});

module.exports = router;