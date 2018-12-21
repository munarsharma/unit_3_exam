const pgp = require("pg-promise")({});
const db = pgp("postgras://localhost:5432/marinebio_db");

module.exports = { db };
