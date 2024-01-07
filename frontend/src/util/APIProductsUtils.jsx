

/*
    Título: API Products Utils
    Descripción: Conjunto de utilidades para interactuar con la API de productos
    Fecha: 06/01/2024
    Última Modificación: 06/01/2024
*/

/* Importado de Bibliotecas Propias */
import { sendPostRequest, sendGetRequest, sendPatchRequest, formatDate } from "./GeneralUtils";

/* Codificación de Funciones */
// Función con la que obtenemos las productos del back
const getProductsRequest = (route, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    }

    sendGetRequest(route, requestConfig, onSuccess, onError);

}

// Función con la que creamos un nuevo producto en el back
const createProductsRequest = (route, product, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestData = {
        DescripcionProducto: product.DescripcionProducto,
        PrecioProducto: product.PrecioProducto,
        FormatoProducto: product.FormatoProducto,
        Cosecha: formatDate(product.Cosecha)
    };
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    }

    sendPostRequest(route, requestData, requestConfig, onSuccess, onError);

}

// Función con la que actualizamos un producto en el back
const editProductsRequest = (route, product, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestData = {
        idProducto: product.idProducto,
        DescripcionProducto: product.DescripcionProducto,
        PrecioProducto: product.PrecioProducto,
        FormatoProducto: product.FormatoProducto,
        Cosecha: formatDate(product.Cosecha)
    };
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    }

    sendPatchRequest(route, requestData, requestConfig, onSuccess, onError);

}

// Función con la que eliminamos un producto del back
const deleteProductRequest = (route, productID, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestData = {
        idProducto: productID
    };
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    };

    sendPatchRequest(route, requestData, requestConfig, onSuccess, onError);

}

// Exportado de funciones
export {
    getProductsRequest,
    createProductsRequest,
    editProductsRequest,
    deleteProductRequest
}