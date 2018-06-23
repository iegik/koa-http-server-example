'use strict';

// FIXME: Rename constant names, move strings to constants APP_...
module.exports = {
  socketPath: process.env.MYSQL_SOCKET_PATH,
  user: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: 'library'
};
