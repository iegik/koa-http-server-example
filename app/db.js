'use strict';

const db = require('./config/db');
const mysql = require('mysql2-promise')();

mysql.configure(db);

module.exports = mysql;
