const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator.js")

const facturaValidator = [
    check("idPedido").exists().notEmpty().isInt(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const addPedidoValidator = [
    check("idClienteFK").exists().notEmpty().isInt(),
    check("Estado").exists().notEmpty().isIn(["En Trámite","Cerrado","Entregado","Liquidado"]),
    check("CantidadBotellas").exists().notEmpty().isInt(),
    check("DescuentoAplicado").exists().notEmpty().isInt(),
    check("datosProductos").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const patchPedidoValidator = [
    check("idPedido").exists().notEmpty().isInt(),
    check("idClienteFK").exists().notEmpty().isInt(),
    check("Estado").exists().notEmpty().isIn(["En Trámite","Cerrado","Entregado","Liquidado"]),
    check("CantidadBotellas").exists().notEmpty().isInt(),
    check("DescuentoAplicado").exists().notEmpty().isInt(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const borrarPedidoValidator = [
    check("idPedido").exists().notEmpty().isInt(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {facturaValidator,addPedidoValidator,patchPedidoValidator,borrarPedidoValidator}