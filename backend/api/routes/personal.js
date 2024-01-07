const express = require("express")
const router = express.Router()
const { getAllEmpleados,patchEmpleado,deleteLogicoEmpleado } = require("../controllers/personal.js")
const uploadMiddleware = require("../utils/handleFotos")
const authMiddleware = require('../middleware/session.js')
const checkRol = require('../middleware/rol.js')
const { handleHttpError } = require('../utils/handleHttpError.js')
const {patchEmpleadoValidator,borrarEmpleadoValidator} = require('../validators/personal.js')

router.get("/",authMiddleware,checkRol(["Administrativo"]), async (req, res) => {
    try
    {
      const empleados = await getAllEmpleados(req)
      res.status(200).json(empleados);
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_GET_ALL_EMPLEADOS", 500)
    }
});

router.patch("/modificarEmpleado",authMiddleware,checkRol(["Administrativo"]),patchEmpleadoValidator, async (req, res) => {
    try
    {
      const empleado = await patchEmpleado(req)
      res.status(200).send("OK");
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_PATCH_EMPLEADO", 500)
    }
});

router.patch("/borrarEmpleado",authMiddleware,checkRol(["Administrativo"]),borrarEmpleadoValidator, async (req, res) => {
    try
    {
      const empleado = await deleteLogicoEmpleado(req)
      res.status(200).send("OK");
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_DELETE_EMPLEADO", 500)
    }
});

module.exports = router