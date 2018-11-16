'use strict';
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({origin: true, credentials: true}));

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(process.env.NODE_ENV == 'development' ? err.stack : 'Server Error');
    next;
});

module.exports = app;
