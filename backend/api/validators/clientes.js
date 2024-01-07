const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator.js")

const addClienteValidator = [
    check("Nombre").exists().notEmpty().isLength({max: 50}),
    check("Apellidos").exists().notEmpty().isLength({max: 50}),
    check("TipoCliente").exists().notEmpty().isIn(["Particular","Empresa"]),
    check("NIF_CIF").exists().notEmpty().isLength({max: 11}),
    check("DireccionCliente").exists().notEmpty().isLength({max: 100}),
    check("Telefono").exists().notEmpty().isInt(),
    check("DireccionEntrega").exists().notEmpty().isLength({max: 100}),
    check("DescuentoVolumen").exists().notEmpty().isInt(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const patchClienteValidator = [
    check("idCliente").exists().notEmpty().isInt(),
    check("Nombre").exists().notEmpty().isLength({max: 50}),
    check("Apellidos").exists().notEmpty().isLength({max: 50}),
    check("TipoCliente").exists().notEmpty().isIn(["Particular","Empresa"]),
    check("NIF_CIF").exists().notEmpty().isLength({max: 11}),
    check("DireccionCliente").exists().notEmpty().isLength({max: 100}),
    check("Telefono").exists().notEmpty().isInt(),
    check("DireccionEntrega").exists().notEmpty().isLength({max: 100}),
    check("DescuentoVolumen").exists().notEmpty().isInt(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const borrarClienteValidator = [
    check("idCliente").exists().notEmpty().isNumeric(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {addClienteValidator,patchClienteValidator,borrarClienteValidator}