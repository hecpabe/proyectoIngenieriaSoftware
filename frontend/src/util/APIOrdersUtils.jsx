

/*
    Título: API Orders Utils
    Descripción: Conjunto de utilidades para interactuar con la API de clientes
    Fecha: 07/01/2024
    Última Modificación: 07/01/2024
*/

/* Importado de Bibliotecas Propias */
import { sendPostRequest, sendGetRequest, sendPatchRequest } from "./GeneralUtils";

/* Codificación de Funciones */
// Función con la que obtenemos los pedidos del back
const getOrdersRequest = (route, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    }

    sendGetRequest(route, requestConfig, onSuccess, onError);

}

// Función con la que obtenemos una factura del back
const getBillRequest = (route, orderID, sessionToken, onSuccess = () => {}, onError = () => {}) => {
 
    // Variables necesarias
    const requestData = {
        idPedido: orderID
    }

    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    }

    sendPatchRequest(route, requestData, requestConfig, onSuccess, onError);

}

// Función con la que creamos un nuevo pedido en el back
const createOrdersRequest = (route, order, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestData = {
        idClienteFK: order.idClienteFK,
        Estado: order.Estado,
        CantidadBotellas: order.CantidadBotellas,
        DescuentoAplicado: order.DescuentoAplicado,
        datosProductos: order.datosProductos
    };
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    }
    
    sendPostRequest(route, requestData, requestConfig, onSuccess, onError);

}

// Función con la que actualizamos un pedido en el back
const editOrdersRequest = (route, order, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestData = {
        idPedido: order.idPedido,
        idClienteFK: order.idClienteFK,
        Estado: order.Estado,
        CantidadBotellas: order.CantidadBotellas,
        DescuentoAplicado: order.DescuentoAplicado
    };
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    }

    sendPatchRequest(route, requestData, requestConfig, onSuccess, onError);

}

// Función con la que eliminamos un pedido del back
const deleteOrderRequest = (route, orderID, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestData = {
        idPedido: orderID
    };
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    };

    sendPatchRequest(route, requestData, requestConfig, onSuccess, onError);

}

// Exportado de funciones
export {
    getOrdersRequest,
    getBillRequest,
    createOrdersRequest,
    editOrdersRequest,
    deleteOrderRequest
}