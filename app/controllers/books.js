'use strict';

const mysql = require('mysql');
// FIXME: Rename constant names, move strings to constants APP_...
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: 'library'
});

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Public
 *     summary: Show books.
 *     operationId: books
 *     responses:
 *       200:
 *         title: Describe books
 */
exports.books = ctx => {
  connection.connect();

  connection.query('SELECT * FROM books', function (error, results) {
    if (error) ctx.throw(500, error.message);
    ctx.res.ok(results);
  });

  connection.end();
};
