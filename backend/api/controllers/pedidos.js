const { where,set } = require("sequelize")
const { Sequelize } = require("../config/mysql.js")
const {Pedidos,Clientes,PreciosProducto_pedido, Productos} = require("../models/models_index.js")
const { handleHttpError } = require('../utils/handleHttpError.js')
const { verifyToken } = require("../utils/handleJwt.js")
const { matchedData } = require("express-validator")

async function getAllPedidos()
{
    var allPedidos=[]
    const pedidos = await Pedidos.findAll({raw:true, where:{Borrado:0},attributes:['idPedido','idClienteFK','Estado','CantidadBotellas','DescuentoAplicado']})

    len=pedidos.length
    for(var i = 0; i<len;i++)
    {
        const clientePedido = await Clientes.findOne({raw:true, where:{idCliente:pedidos[i].idClienteFK},attributes:['Nombre','Apellidos']});

        const pedido = {
            idPedido: pedidos[i].idPedido,
            Nombre:clientePedido.Nombre,
            Apellidos:clientePedido.Apellidos,
            Estado:pedidos[i].Estado,
            CantidadBotellas:pedidos[i].CantidadBotellas,
            DescuentoAplicado:pedidos[i].DescuentoAplicado
        };
        allPedidos.push(pedido)
    }
    return allPedidos
}

async function getFacturaPedido(req)
{

    const body = matchedData(req)

    var datosProductos=[]
    const pedido = await Pedidos.findOne({raw:true, where:{Borrado:0,idPedido:body.idPedido},attributes:['idPedido','idClienteFK','Estado','CantidadBotellas','DescuentoAplicado']})


    const clientePedido = await Clientes.findOne({raw:true, where:{idCliente:pedido.idClienteFK,Borrado:0},attributes:['Nombre','Apellidos']});

    const productosPedido = await PreciosProducto_pedido.findAll({raw:true, where:{idPedidoFK:pedido.idPedido},attributes:['idProductoFK','Cantidad']});

    var productosPedidoLen=productosPedido.length
    for(var i = 0; i < productosPedidoLen; i++)
    {
        const productoAniadir = await Productos.findOne({raw:true, where:{idProducto:productosPedido[i].idProductoFK,Borrado:0}, attributes:['idProducto','DescripcionProducto','PrecioProducto','FormatoProducto','Cosecha']});

        const productoPedido = {idProducto:productoAniadir.idProducto,
                                DescripcionProducto:productoAniadir.DescripcionProducto,
                                PrecioProducto:productoAniadir.PrecioProducto,
                                Cantidad:productosPedido[i].Cantidad,
                                PrecioProductos:(productoAniadir.PrecioProducto*productosPedido[i].Cantidad),
                                FormatoProducto:productoAniadir.FormatoProducto,
                                Cosecha:productoAniadir.Cosecha
                            }

        datosProductos.push(productoPedido)
    }

    var datosProductosLen = datosProductos.length

    var totalSinDescuento = 0
    for(var i = 0; i < datosProductosLen; i++)
    {
        totalSinDescuento=parseFloat(totalSinDescuento)+parseFloat(datosProductos[i].PrecioProducto)
    }

    var totalConDescuento = (totalSinDescuento - (totalSinDescuento * (pedido.DescuentoAplicado / 100)));

    const factura = {
                        idPedido:body.idPedido,
                        Nombre:clientePedido.Nombre,
                        Apellidos:clientePedido.Apellidos,
                        Estado:pedido.Estado,
                        CantidadBotellas:pedido.CantidadBotellas,
                        DescuentoAplicado:pedido.DescuentoAplicado,
                        datosProductos:datosProductos,
                        totalSinDescuento:totalSinDescuento,
                        totalConDescuento:totalConDescuento
                    }

    return factura

}

async function addPedido(req)
{
    try {
        const body = matchedData(req)

        await Pedidos.create({
            idClienteFK:body.idClienteFK,
            Estado:body.Estado,
            CantidadBotellas:body.CantidadBotellas,
            DescuentoAplicado:body.DescuentoAplicado,
            Borrado:0});

        const pedido = await Pedidos.findOne({raw:true, where:{Borrado:0}, order:[['idPedido','DESC']],limit:1, attributes:['idPedido']});

        const idPedido = pedido.idPedido

        //console.log(pedido)

        const datosProductos=body.datosProductos
        
        //console.log(datosProductos)

        for( var i = 0; i < datosProductos.length; i++)
        {
            PreciosProducto_pedido.create({
                idProductoFK:datosProductos[i].idProducto,
                idPedidoFK:idPedido,
                Cantidad:datosProductos[i].Cantidad
            })
        }


        
    } catch (e) {
        console.log(e)
        handleHttpError("ERROR_ADDING_PEDIDO")
    }
}

async function patchPedido(req)
{
    try {
        const body = matchedData(req)

        var pedido = await Pedidos.findOne({where:{idPedido:body.idPedido}})
        pedido.idClienteFK=body.idClienteFK
        pedido.Estado=body.Estado
        pedido.CantidadBotellas=body.CantidadBotellas
        pedido.DescuentoAplicado=body.DescuentoAplicado
        
        await pedido.save()
    } catch (e) {
        console.log(e)
        handleHttpError("ERROR_PATCHING_PEDIDO")
    }
}

async function deleteLogicoPedido(req)
{
    try {
        const body = matchedData(req)

        var pedido = await Pedidos.findOne({where:{idPedido:body.idPedido}})
        
        pedido.Borrado = 1;
        
        await pedido.save()
    } catch (e) {
        console.log(e)
        handleHttpError("ERROR_DELETING_PEDIDO")
    }
}

module.exports = {getAllPedidos,getFacturaPedido,addPedido,patchPedido,deleteLogicoPedido}