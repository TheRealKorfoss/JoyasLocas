const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;
// Middleware
app.use(bodyParser.json());
app.use(cors());