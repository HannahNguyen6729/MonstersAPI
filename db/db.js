const { Pool } = require("pg");
const {
  user,
  password,
  host,
  database,
  port,
} = require("../secrets/db_configuration");

const pool = new Pool({
  user,
  host,
  password,
  database,
  port,
});

module.exports = pool;
