const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator.js")

const patchEmpleadoValidator = [
    check("idPersonal").exists().notEmpty().isInt(),
    check("NIF").exists().notEmpty().isLength({max: 15}),
    check("Nombre").exists().notEmpty().isLength({max: 20}),
    check("Apellidos").exists().notEmpty().isLength({max: 50}),
    check("FechaNacimiento").exists().notEmpty(),
    check("Domicilio").exists().notEmpty().isLength({max: 100}),
    check("Telefono").exists().notEmpty().isInt().isLength({max: 15}),
    check("ContactoEmergencia").exists().notEmpty().isInt().isLength({max: 15}),
    check("CategoriaLaboral").exists().notEmpty().isIn(["Personal", "Administrativo"]),
    check("FechaIngreso").exists().notEmpty(),
    check("NumHijos").exists().notEmpty().isInt(),
    check("EstadoCivil").exists().notEmpty().isIn(["Soltero", "Casado"]),
    check("IBAN").exists().notEmpty().isLength({max: 50}),
    check("CodigoEmpresa").exists().notEmpty().isLength({min:8, max: 100}),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const borrarEmpleadoValidator = [
    check("idPersonal").exists().notEmpty().isNumeric(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {patchEmpleadoValidator,borrarEmpleadoValidator}