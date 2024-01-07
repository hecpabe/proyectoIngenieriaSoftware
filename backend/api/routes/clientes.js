const express = require("express")
const router = express.Router()
const { handleHttpError } = require('../utils/handleHttpError.js')
const { getAllClientes,addCliente,patchCliente,deleteLogicoCliente } = require("../controllers/clientes.js")
const uploadMiddleware = require("../utils/handleFotos")
const authMiddleware = require('../middleware/session.js')
const checkRol = require('../middleware/rol.js')
const {addClienteValidator,patchClienteValidator,borrarClienteValidator} = require('../validators/clientes.js')

router.get("/",authMiddleware,checkRol(["Personal","Administrativo"]), async (req, res) => {
    try
    {
      const clientes = await getAllClientes(req)
      res.status(200).json(clientes);
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_GET_ALL_CLIENTES", 500)
    }
});

router.post("/",authMiddleware,checkRol(["Personal","Administrativo"]),addClienteValidator, async (req, res) => {
    try
    {
      console.log("RECIBIENDO CLIENTE");
      const cliente = await addCliente(req);
      res.status(200).send("OK");
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_POST_CLIENTE", 500)
    }
});

router.patch("/modificarCliente",authMiddleware,checkRol(["Personal","Administrativo"]),patchClienteValidator, async (req, res) => {
    try
    {
      const cliente = await patchCliente(req)
      res.status(200).send("OK");
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_PATCH_CLIENTE", 500)
    }
});

router.patch("/borrarCliente",authMiddleware,checkRol(["Personal","Administrativo"]),borrarClienteValidator, async (req, res) => {
    try
    {
      const cliente = await deleteLogicoCliente(req)
      res.status(200).send("OK");
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_DELETE_CLIENTE", 500)
    }
});

module.exports = router