const { Client } = require("pg");

let dbClient;

const init = async () => {
  dbClient = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });
  await dbClient.connect();

  // Create the subscribe list if doesnt exist
  dbClient
    .query(
      `CREATE TABLE IF NOT EXISTS subscribe_list
        (
          id SERIAL PRIMARY KEY,
          discord TEXT UNIQUE
        );`
    )
    .catch((e) => console.error(e.stack));
};

const getSubscribed = async () => {
  return dbClient
    .query(`SELECT discord FROM subscribe_list`)
    .then((res) => {
      return res.rows.map((row) => row.discord);
    })
    .catch((e) => {
      console.error(e.stack);
      return [];
    });
};

const subscribe = async (user) => {
  return dbClient.query(`INSERT INTO subscribe_list(discord) VALUES (${user})`);
};

const unsubscribe = async (user) => {
  return dbClient.query(`DELETE FROM subscribe_list WHERE discord = '${user}'`);
};

module.exports = { init, getSubscribed, subscribe, unsubscribe };
