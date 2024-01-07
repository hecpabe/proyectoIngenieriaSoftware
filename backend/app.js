//const mysql = require('mysql');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, dbConnect} = require("./api/config/mysql.js")
const swaggerUi = require("swagger-ui-express")
const app = express(); //usaremos express para el router
app.use(cors());
app.use(express.json());
const swaggerSpecs = require("./api/docs/swagger.js")

const PORT = process.env.port || 3011

app.use(express.static(__dirname + '/api/storage'));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
//ponemos las rutas
app.use("/api", require("./api/routes/index.js")) //Lee routes/index.js por defecto; accedemos a todas las funcionalidades de cada tabla

app.use(express.static(__dirname + '/api/public'));

app.listen(PORT,'0.0.0.0' ,()=>{
    dbConnect();
    console.log(`server is listening  on ${PORT}`);
});
