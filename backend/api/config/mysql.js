require('dotenv').config()
const {Sequelize} = require("sequelize");

const user= process.env.user || "admin";
const host = process.env.host;
const pwd= process.env.pwd || "password";
const nameDB = process.env.nameDB || "ANIADA_MASTER";

const sequelize = new Sequelize(
    nameDB,
    user,
    pwd,
     {
       host: host,
       dialect: 'mysql'
     }
);

const dbConnect = async() =>{

    try{
        await sequelize.authenticate()
        console.log("MySQL conexión correcta")
    }catch(err){
        console.log("MySQL error de conexión:", err)
    }
}

module.exports = {sequelize, dbConnect}