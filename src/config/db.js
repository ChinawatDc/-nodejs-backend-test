const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: process.env.DB_PASSWORD,
});

module.exports = db;
