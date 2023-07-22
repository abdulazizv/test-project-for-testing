const { Pool } = require("pg");
const config = require("config");

const pool = new Pool({
  user: config.get("user") || "postgres",
  password: config.get("password") || "paswd",
  database: config.get("database") || "datadb",
  host: config.get("host") || "localhost",
  port: config.get("db_port") || 5000,
});

async function fetchAll(query, ...params) {
  try {
    const client = await pool.connect();
    let { rows } = await client.query(query, params.length ? params : null);
    return rows;
  } catch (e) {
    console.log(`Error detected at connecting postgres`, e);
  }
}

async function fetch(query, ...params) {
  let client = await pool.connect();
  let {
    rows: [value],
  } = await client.query(query, params.length ? params : null);
  console.log(value)
  return value;
}

module.exports = { pool,fetch, fetchAll };
