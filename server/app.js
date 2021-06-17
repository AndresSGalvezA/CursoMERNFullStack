const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const { API_VERSION } = require('./config');

// Load routings

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configure Header HTTP

// Router basic

module.exports = app;