const { where,set } = require("sequelize")
const { Sequelize } = require("../config/mysql.js")
const {MateriasPrimas} = require("../models/models_index.js")
const { handleHttpError } = require('../utils/handleHttpError.js')
const { verifyToken } = require("../utils/handleJwt.js")
const { matchedData } = require("express-validator")

async function getAllMateriasPrimas()
{
    const materiasPrimas = await MateriasPrimas.findAll({
        raw:true, 
        where:{Borrado:0},
        attributes:[
            'idMateriaPrrima',
            'nombreMateriaPrima',
            'Fecha',
            'Cantidad',
            'CodigoVinia',
            'DescripcionMateriaPrima',
            'TipoUva',
            'GradoMadurez',
            'Valoracion']})
    return materiasPrimas
}

async function addMateriaPrima(req)
{
    try {
        const body = matchedData(req)
        await MateriasPrimas.create({
            nombreMateriaPrima:body.nombreMateriaPrima,
            Fecha:body.Fecha,
            Cantidad:body.Cantidad,
            CodigoVinia:body.CodigoVinia,
            DescripcionMateriaPrima:body.DescripcionMateriaPrima,
            TipoUva:body.TipoUva,
            GradoMadurez:body.GradoMadurez,
            Valoracion:body.Valoracion,
            Borrado:0})
    } catch (e) {
        console.log(e)
        handleHttpError("ERROR_ADDING_MATERIA_PRIMA")
    }
}

async function patchMateriaPrima(req)
{
    try {
        const body = matchedData(req);

        var materiaPrima = await MateriasPrimas.findOne({where:{idMateriaPrrima:body.idMateriaPrrima}});

        materiaPrima.nombreMateriaPrima=body.nombreMateriaPrima;
        materiaPrima.Fecha=body.Fecha;
        materiaPrima.Cantidad=body.Cantidad;
        materiaPrima.CodigoVinia=body.CodigoVinia;
        materiaPrima.DescripcionMateriaPrima=body.DescripcionMateriaPrima;
        materiaPrima.TipoUva=body.TipoUva;
        materiaPrima.GradoMadurez=body.GradoMadurez;
        materiaPrima.Valoracion=body.Valoracion;
        
        await materiaPrima.save();
    } catch (e) {
        console.log(e)
        handleHttpError("ERROR_PATCHING_MATERIA_PRIMA")
    }
}

async function deleteLogicoMateriaPrima(req)
{
    try {
        const body = matchedData(req)

        var materiaPrima = await MateriasPrimas.findOne({where:{idMateriaPrrima:body.idMateriaPrrima}})
        
        materiaPrima.Borrado = 1;
        
        await materiaPrima.save()
    } catch (e) {
        console.log(e)
        handleHttpError("ERROR_DELETING_MATERIA_PRIMA")
    }
}

module.exports = {getAllMateriasPrimas,addMateriaPrima,patchMateriaPrima,deleteLogicoMateriaPrima}