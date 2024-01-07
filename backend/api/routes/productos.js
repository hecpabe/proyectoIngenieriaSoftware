const express = require("express")
const router = express.Router()
const { getAllProductos,addProducto,patchProducto,deleteLogicoProducto } = require("../controllers/productos.js")
const uploadMiddleware = require("../utils/handleFotos")
const authMiddleware = require('../middleware/session.js')
const checkRol = require('../middleware/rol.js')
const { handleHttpError } = require('../utils/handleHttpError.js')
const {addProductoValidator,patchProductoValidator,borrarProductoValidator} = require('../validators/productos.js')

router.get("/",authMiddleware,checkRol(["Personal","Administrativo"]), async (req, res) => {
    try
    {
      const productos = await getAllProductos(req)
      res.status(200).json(productos);
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_GET_ALL_PRODUCTOS", 500)
    }
});

router.post("/",authMiddleware,checkRol(["Personal","Administrativo"]),addProductoValidator, async (req, res) => {
    try
    {
      const producto = await addProducto(req)
      res.status(200).send("OK");
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_POST_PRODUCTO", 500)
    }
});

router.patch("/modificarProducto",authMiddleware,checkRol(["Personal","Administrativo"]),patchProductoValidator, async (req, res) => {
    try
    {
      const producto = await patchProducto(req)
      res.status(200).send("OK");
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_PATCH_PRODUCTO", 500)
    }
});

router.patch("/borrarProducto",authMiddleware,checkRol(["Personal","Administrativo"]),borrarProductoValidator, async (req, res) => {
    try
    {
      const producto = await deleteLogicoProducto(req)
      res.status(200).send("OK");
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_DELETE_PRODUCTO", 500)
    }
});

module.exports = router