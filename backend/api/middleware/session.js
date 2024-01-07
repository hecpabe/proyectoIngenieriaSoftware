const { Personal } = require('../models/models_index.js');
const {handleHttpError} = require("../utils/handleHttpError.js")
const { verifyToken } = require("../utils/handleJwt.js")

const authMiddleware = async (req, res, next) =>{

    try{
        
        if(!req.headers.authorization){
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }
        //Nos llega la palabra reservada Bearer (un estándar) y el Token, así que me quedo con la última parte
        const token = req.headers.authorization.split(' ').pop()
        //del token, miramos el Payload (revisar verifyToken de utils/handleJwt)
        const dataToken = await verifyToken(token)

        if(!dataToken){
            handleHttpError(res, "ERROR_ID_TOKEN", 401)
            return
        }
        
        const user = await Personal.findOne({raw:true, where : {NIF : dataToken.NIF}, attributes:["NIF", "Nombre", "Apellidos", "FechaNacimiento", "Domicilio","Telefono","ContactoEmergencia","CategoriaLaboral","FechaIngreso",
        "NumHijos","EstadoCivil","IBAN","Borrado"]});
        req.user = user
        
        next()
    }catch(err){
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

module.exports = authMiddleware