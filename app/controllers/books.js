'use strict';

const db = require('../db');

exports.books = async ctx => {
  try {
    let [rows] = await db.execute('SELECT * FROM books');
    ctx.res.ok(rows);
  } catch (e) {
    ctx.throw(500, e.message);
  }
};
