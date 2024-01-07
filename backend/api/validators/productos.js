const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator.js")

const addProductoValidator = [
    check("DescripcionProducto").exists().notEmpty().isLength({max: 200}),
    check("PrecioProducto").exists().notEmpty().isNumeric(),
    check("FormatoProducto").exists().notEmpty().isIn(["Benjamín","Magnum","Imperial"]),
    check("Cosecha").exists().notEmpty().isDate(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const patchProductoValidator = [
    check("idProducto").exists().notEmpty().isInt(),
    check("DescripcionProducto").exists().notEmpty().isLength({max: 200}),
    check("PrecioProducto").exists().notEmpty().isNumeric(),
    check("FormatoProducto").exists().notEmpty().isIn(["Benjamín","Magnum","Imperial"]),
    check("Cosecha").exists().notEmpty().isDate(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const borrarProductoValidator = [
    check("idProducto").exists().notEmpty().isInt(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {addProductoValidator,patchProductoValidator,borrarProductoValidator}