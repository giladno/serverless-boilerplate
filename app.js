'use strict';
const util = require('util');
const express = require('express');
const cors = require('cors');
const log = require('loglevel');
const AWS = require('aws-sdk');

log.setLevel(process.env.LOG_LEVEL || 'warn');

const ECS = new AWS.ECS();
const runTask = util.promisify(ECS.runTask).bind(ECS);

const app = express();

app.use(express.json());
app.use(cors({origin: true, credentials: true}));

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.get('/task', async (req, res, next) => {
    try {
        res.json(
            await runTask({
                cluster: process.env.FARGATE_CLUSTER,
                launchType: 'FARGATE',
                taskDefinition: 'Task1',
                count: 1,
                platformVersion: 'LATEST',
                networkConfiguration: {
                    awsvpcConfiguration: {
                        subnets: process.env.SUBNETS.split(','),
                        securityGroups: process.env.SECURITY_GROUP.split(','),
                    },
                },
            })
        );
    } catch (err) {
        next(err);
    }
});

app.use((err, req, res, next) => {
    log.error(err);
    res.status(500).send(process.env.NODE_ENV == 'development' ? err.stack : 'Server Error');
    next;
});

module.exports = app;
