const { where,set } = require("sequelize")
const { Sequelize } = require("../config/mysql.js")
const {Productos} = require("../models/models_index.js")
const { handleHttpError } = require('../utils/handleHttpError.js')
const { verifyToken } = require("../utils/handleJwt.js")
const { matchedData } = require("express-validator")

async function getAllProductos()
{
    const productos = await Productos.findAll({raw:true, where:{Borrado:0},attributes:['idProducto','DescripcionProducto','PrecioProducto','FormatoProducto','Cosecha']})
    return productos
}

async function addProducto(req)
{
    try {
        const body = matchedData(req)
        await Productos.create({
            DescripcionProducto:body.DescripcionProducto,
            PrecioProducto:body.PrecioProducto,
            FormatoProducto:body.FormatoProducto,
            Cosecha:body.Cosecha,
            Borrado:0})
    } catch (e) {
        console.log(e)
        handleHttpError("ERROR_ADDING_PRODUCTO")
    }
}

async function patchProducto(req)
{
    try {
        const body = matchedData(req);

        var producto = await Productos.findOne({where:{idProducto:body.idProducto}});
        producto.DescripcionProducto=body.DescripcionProducto;
        producto.PrecioProducto=body.PrecioProducto;
        producto.FormatoProducto=body.FormatoProducto;
        producto.Cosecha=body.Cosecha;
        
        await producto.save();
    } catch (e) {
        console.log(e)
        handleHttpError("ERROR_PATCHING_PRODUCTO")
    }
}

async function deleteLogicoProducto(req)
{
    try {
        const body = matchedData(req)

        var producto = await Productos.findOne({where:{idProducto:body.idProducto}})
        
        producto.Borrado = 1;
        
        await producto.save()
    } catch (e) {
        console.log(e)
        handleHttpError("ERROR_DELETING_PRODUCTO")
    }
}

module.exports = {getAllProductos,addProducto,patchProducto,deleteLogicoProducto}