const express = require("express")
const router = express.Router()
const { getAllPedidos,getFacturaPedido,addPedido,patchPedido,deleteLogicoPedido } = require("../controllers/pedidos.js")
const uploadMiddleware = require("../utils/handleFotos")
const authMiddleware = require('../middleware/session.js')
const checkRol = require('../middleware/rol.js')
const { handleHttpError } = require('../utils/handleHttpError.js')
const {facturaValidator,addPedidoValidator,patchPedidoValidator,borrarPedidoValidator} = require('../validators/pedidos.js')

router.get("/",authMiddleware,checkRol(["Personal","Administrativo"]), async (req, res) => {
    try
    {
      const pedidos = await getAllPedidos(req)
      res.status(200).json(pedidos);
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_GET_ALL_PEDIDOS", 500)
    }
});

router.patch("/factura",authMiddleware,checkRol(["Personal","Administrativo"]),facturaValidator, async (req, res) => {
    try
    {
      const factura = await getFacturaPedido(req)
      res.status(200).json(factura);
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_GET_FACTURA_PEDIDO", 500)
    }
});

router.post("/",authMiddleware,checkRol(["Personal","Administrativo"]),addPedidoValidator, async (req, res) => {
    try
    {
      const pedido = await addPedido(req)
      res.status(200).send("OK");
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_POST_PEDIDO", 500)
    }
});

router.patch("/modificarPedido",authMiddleware,checkRol(["Personal","Administrativo"]),patchPedidoValidator, async (req, res) => {
    try
    {
      const pedido = await patchPedido(req)
      res.status(200).send("OK");
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_PATCH_PEDIDO", 500)
    }
});

router.patch("/borrarPedido",authMiddleware,checkRol(["Personal","Administrativo"]),borrarPedidoValidator, async (req, res) => {
    try
    {
      const pedido = await deleteLogicoPedido(req)
      res.status(200).send("OK");
      
    }
    catch(e)
    {
      console.log(e)
      handleHttpError(res, "ERROR_DELETE_PEDIDO", 500)
    }
});

module.exports = router