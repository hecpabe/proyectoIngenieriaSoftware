const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator.js")

const addMateriaPrimaValidator = [
    check("nombreMateriaPrima").exists().notEmpty().isLength({max: 20}),
    check("Fecha").exists().notEmpty().isDate(),
    check("Cantidad").exists().notEmpty().isInt(),
    check("CodigoVinia").exists().notEmpty().isInt(),
    check("DescripcionMateriaPrima").exists().notEmpty().isLength({max: 200}),
    check("TipoUva").exists().notEmpty().isIn(["Tempranillo","Garnacha","Mencía","Monastrell"]),
    check("GradoMadurez").exists().notEmpty().isInt(),
    check("Valoracion").exists().notEmpty().isInt({min:1,max: 5}),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const patchMateriaPrimaValidator = [
    check("idMateriaPrrima").exists().notEmpty().isInt(),
    check("nombreMateriaPrima").exists().notEmpty().isLength({max: 20}),
    check("Fecha").exists().notEmpty().isDate(),
    check("Cantidad").exists().notEmpty().isInt(),
    check("CodigoVinia").exists().notEmpty().isInt(),
    check("DescripcionMateriaPrima").exists().notEmpty().isLength({max: 200}),
    check("TipoUva").exists().notEmpty().isIn(["Tempranillo","Garnacha","Mencía","Monastrell"]),
    check("GradoMadurez").exists().notEmpty().isInt(),
    check("Valoracion").exists().notEmpty().isInt({min:1,max: 5}),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const borrarMateriaPrimaValidator = [
    check("idMateriaPrrima").exists().notEmpty().isInt(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {addMateriaPrimaValidator,patchMateriaPrimaValidator,borrarMateriaPrimaValidator}