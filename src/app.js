const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const { errors } = require("celebrate");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

/*
 * Tipos de parâmetros:
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */
/*
 * SQL: MYSQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NOSQL: MongoDB, CouchDB, etc
 */

/*
 * Driver: SELECT * from users
 * Query Builder: Table('users').select('*').where()
 */

module.exports = app;
