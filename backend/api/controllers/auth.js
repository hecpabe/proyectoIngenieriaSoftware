const {users, Personal} = require("../models/models_index.js")
const { handleHttpError } = require('../utils/handleHttpError.js')
const { matchedData } = require('express-validator')
const { encrypt, compare } = require("../utils/handlePassword.js")
const { tokenSign } = require('../utils/handleJwt.js')

const registerCtrl = async (req, res) => {

    try{
        req = matchedData(req)
        const NIF = req.NIF
        const Nombre = req.Nombre
        const Apellidos = req.Apellidos
        const FechaNacimiento = req.FechaNacimiento
        const Domicilio=req.Domicilio
        const Telefono = req.Telefono
        const ContactoEmergencia = req.ContactoEmergencia
        const CategoriaLaboral = req.CategoriaLaboral
        const FechaIngreso = req.FechaIngreso
        const NumHijos = req.NumHijos
        const EstadoCivil = req.EstadoCivil
        const IBAN = req.IBAN
        const CodigoEmpresa = await encrypt(req.CodigoEmpresa)
        const Borrado = 0
        //const body = {...req, USER_PASSWORD, ID_GRUPO_USERS} // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
       // const body = {EMAIL, USER_PASSWORD, USER_ROLE, USER_TYPE, ID_GRUPO_USERS}
       const body = {NIF, Nombre, Apellidos, FechaNacimiento, Domicilio,Telefono,ContactoEmergencia,CategoriaLaboral,FechaIngreso,
        NumHijos,EstadoCivil,IBAN,CodigoEmpresa,Borrado}
        const dataUser = await Personal.create(body)
        dataUser.set('CodigoEmpresa',undefined, { strict: false })
    
        //le damos un token al usuario
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send(data)

    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_REGISTER')
    }
}


const loginCtrl = async (req, res) => {
   
    try{
        req = matchedData(req)
         
        const users = await Personal.findAll({raw:true, where : {Borrado:0}, attributes:["idPersonal", "NIF", "Nombre", "Apellidos", "FechaNacimiento", "Domicilio","Telefono","ContactoEmergencia","CategoriaLaboral","FechaIngreso",
            "NumHijos","EstadoCivil","IBAN","CodigoEmpresa","Borrado"]})
        
        var user = null
        for(var p = 0; p < users.length; p++)
        {
            const hashPassword = users[p].CodigoEmpresa;
            const check = await compare(req.CodigoEmpresa, hashPassword)
            if(check)
            {
                //users[p].set("CodigoEmpresa", undefined, {strict:false})
                user=users[p]
            }
        }

        if(!user){
            handleHttpError(res, {RESPONSE:"USER_NOT_EXISTS/INVALID_PASSWORD"}, 404)
            return
        }

        //const hashPassword = user.password;
        //const check = await compare(req.password, hashPassword)
        //if(!check){
        //    handleHttpError(res, {RESPONSE:"INVALID_PASSWORD"}, 401)
        //    return
        //}
        const data = {
            token : await tokenSign(user),
            user : user
        }

        res.send(data);
    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

module.exports = {registerCtrl, loginCtrl}