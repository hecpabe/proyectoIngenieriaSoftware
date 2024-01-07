const { where,set } = require("sequelize")
const { Sequelize } = require("../config/mysql.js")
const {Personal} = require("../models/models_index.js")
const { handleHttpError } = require('../utils/handleHttpError.js')
const { verifyToken } = require("../utils/handleJwt.js")
const { matchedData } = require("express-validator")
const { encrypt, compare } = require("../utils/handlePassword.js")

async function getAllEmpleados()
{
    const empleados = await Personal.findAll({
        raw:true, 
        where:{Borrado:0},
        attributes:[
            'idPersonal',
            'NIF',
            'Nombre',
            'Apellidos',
            'FechaNacimiento',
            'Domicilio',
            'Telefono',
            'ContactoEmergencia',
            'CategoriaLaboral',
            'FechaIngreso',
            'NumHijos',
            'EstadoCivil',
            'IBAN',
            'CodigoEmpresa']})
    return empleados
}

async function patchEmpleado(req)
{
    try {
        const body = matchedData(req);

        var empleado = await Personal.findOne({where:{idPersonal:body.idPersonal}});

        empleado.NIF=body.NIF;
        empleado.Nombre=body.Nombre;
        empleado.Apellidos=body.Apellidos;
        empleado.FechaNacimiento=body.FechaNacimiento;
        empleado.Domicilio=body.Domicilio;
        empleado.Telefono=body.Telefono;
        empleado.ContactoEmergencia=body.ContactoEmergencia;
        empleado.CategoriaLaboral=body.CategoriaLaboral;
        empleado.FechaIngreso=body.FechaIngreso;
        empleado.NumHijos=body.NumHijos;
        empleado.EstadoCivil=body.EstadoCivil;
        empleado.IBAN=body.IBAN;
        empleado.CodigoEmpresa=await encrypt(body.CodigoEmpresa);
        
        await empleado.save();
    } catch (e) {
        console.log(e)
        handleHttpError("ERROR_PATCHING_EMPLEADO")
    }
}

async function deleteLogicoEmpleado(req)
{
    try {
        const body = matchedData(req)

        var empleado = await Personal.findOne({where:{idPersonal:body.idPersonal}})
        
        empleado.Borrado = 1;
        
        await empleado.save();
    } catch (e) {
        console.log(e)
        handleHttpError("ERROR_DELETING_EMPLEADO")
    }
}

module.exports = {getAllEmpleados,patchEmpleado,deleteLogicoEmpleado}