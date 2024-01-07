const { where,set } = require("sequelize")
const { Sequelize } = require("../config/mysql.js")
const {Clientes} = require("../models/models_index.js")
const { handleHttpError } = require('../utils/handleHttpError.js')
const { verifyToken } = require("../utils/handleJwt.js")
const { matchedData } = require("express-validator")

async function getAllClientes()
{
    const clientes = await Clientes.findAll({
        raw:true, 
        where:{Borrado:0},
        attributes:[
            'idCliente',
            'Nombre',
            'Apellidos',
            'TipoCliente',
            'NIF_CIF',
            'DireccionCliente',
            'Telefono',
            'DireccionEntrega',
            'DescuentoVolumen']})
    return clientes
}

async function addCliente(req)
{
    try {
        const body = matchedData(req)
        await Clientes.create({
            Nombre:body.Nombre,
            Apellidos:body.Apellidos,
            TipoCliente:body.TipoCliente,
            NIF_CIF:body.NIF_CIF,
            DireccionCliente:body.DireccionCliente,
            Telefono:body.Telefono,
            DireccionEntrega:body.DireccionEntrega,
            DescuentoVolumen:body.DescuentoVolumen,
            Borrado:0})
    } catch (e) {
        console.log(e)
        handleHttpError("ERROR_ADDING_CLIENTE")
    }
}

async function patchCliente(req)
{
    try {
        const body = matchedData(req);

        var cliente = await Clientes.findOne({where:{idCliente:body.idCliente}});

        cliente.Nombre=body.Nombre;
        cliente.Apellidos=body.Apellidos;
        cliente.TipoCliente=body.TipoCliente;
        cliente.NIF_CIF=body.NIF_CIF;
        cliente.DireccionCliente=body.DireccionCliente;
        cliente.Telefono=body.Telefono;
        cliente.DireccionEntrega=body.DireccionEntrega;
        cliente.DescuentoVolumen=body.DescuentoVolumen;
        
        await cliente.save();
    } catch (e) {
        console.log(e)
        handleHttpError("ERROR_PATCHING_CLIENTE")
    }
}

async function deleteLogicoCliente(req)
{
    try {
        const body = matchedData(req)

        var cliente = await Clientes.findOne({where:{idCliente:body.idCliente}})
        
        cliente.Borrado = 1;
        
        await cliente.save()
    } catch (e) {
        console.log(e)
        handleHttpError("ERROR_DELETING_CLIENTE")
    }
}

module.exports = {getAllClientes,addCliente,patchCliente,deleteLogicoCliente}