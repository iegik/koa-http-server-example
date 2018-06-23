'use strict';

// FIXME: Rename constant names, move strings to constants APP_...
module.exports = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: 'library'
};
