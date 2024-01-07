const express = require("express")
const router = express.Router()
const { getAllMateriasPrimas,addMateriaPrima,patchMateriaPrima,deleteLogicoMateriaPrima } = require("../controllers/materiasPrimas.js")
const uploadMiddleware = require("../utils/handleFotos")
const authMiddleware = require('../middleware/session.js')
const checkRol = require('../middleware/rol.js')
const { handleHttpError } = require('../utils/handleHttpError.js')
const {addMateriaPrimaValidator,patchMateriaPrimaValidator,borrarMateriaPrimaValidator} = require('../validators/materiasPrimas.js')

router.get("/",authMiddleware,checkRol(["Personal","Administrativo"]), async (req, res) => {
    try
    {
      const materiasPrimas = await getAllMateriasPrimas(req)
      res.status(200).json(materiasPrimas);
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_GET_ALL_MATERIAS_PRIMAS", 500)
    }
});

router.post("/",authMiddleware,checkRol(["Personal","Administrativo"]),addMateriaPrimaValidator, async (req, res) => {
    try
    {
      const cliente = await addMateriaPrima(req)
      res.status(200).send("OK");
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_POST_MATERIA_PRIMA", 500)
    }
});

router.patch("/modificarMateriaPrima",authMiddleware,checkRol(["Personal","Administrativo"]),patchMateriaPrimaValidator, async (req, res) => {
    try
    {
      const cliente = await patchMateriaPrima(req)
      res.status(200).send("OK");
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_PATCH_MATERIA_PRIMA", 500)
    }
});

router.patch("/borrarMateriaPrima",authMiddleware,checkRol(["Personal","Administrativo"]),borrarMateriaPrimaValidator, async (req, res) => {
    try
    {
      const cliente = await deleteLogicoMateriaPrima(req)
      res.status(200).send("OK");
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_DELETE_MATERIA_PRIMA", 500)
    }
});

module.exports = router