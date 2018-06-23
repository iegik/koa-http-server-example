'use strict';

const db = require('../db');

const claim = fn => (...args) => fn(...args);
const reduce = claim([].reduce);
const props2query = props => reduce(props, (out, val, key) => out.push(`${key}="${val}"`), []).join(',');

const CRUD = function (table) {
  return Object.freeze({
    insert: async (ctx) => {
      const { params } = ctx;
      const fields = Object.keys(params);
      const values = Object.values(params);

      try {
        let [rows] = await db.execute(`INSERT INTO ${table} (${fields}) VALUES (${values})`);
        ctx.res.ok(rows);
      } catch (e) {
        ctx.throw(500, e.message);
      }
    },
    find: async (ctx) => {
      try {
        let [rows] = await db.execute(`SELECT * FROM ${table}`);
        ctx.res.ok(rows);
      } catch (e) {
        console.log(e);
        ctx.throw(500, e.message);
      }
    },
    updateById: async (ctx) => {
      const { params } = ctx;
      const { id, ...rest } = params;

      try {
        let [rows] = await db.execute(`UPDATE ${table} SET ${props2query(rest)} WHERE id=${id}`);
        ctx.res.ok(rows);
      } catch (e) {
        ctx.throw(500, e.message);
      }
    },
    remove: async (ctx) => {
      const { params } = ctx;
      const { id } = params;

      try {
        let [rows] = await db.execute(`DELETE FROM ${table} WHERE id=${id}`);
        ctx.res.ok(rows);
      } catch (e) {
        ctx.throw(500, e.message);
      }
    },
    findById: async (ctx) => {
      const { params } = ctx;
      const { id } = params;
      try {
        let [rows] = await db.execute(`SELECT * FROM ${table} WHERE id=${id}`);
        if (!rows.length) return ctx.status = 404;
        ctx.res.ok(rows[0]);
      } catch (e) {
        ctx.throw(500, e.message);
      }
    },
  });
};

module.exports = CRUD('book');
