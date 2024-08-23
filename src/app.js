const express = require('express');
const morgan = require('morgan');
const v1Router = require('./routes/versions/v1');

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(morgan('combined'));
app.use('/api/v1',v1Router);

module.exports = app;
