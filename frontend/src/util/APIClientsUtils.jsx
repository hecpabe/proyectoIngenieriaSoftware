

/*
    Título: API Clients Utils
    Descripción: Conjunto de utilidades para interactuar con la API de clientes
    Fecha: 06/01/2024
    Última Modificación: 06/01/2024
*/

/* Importado de Bibliotecas Propias */
import { sendPostRequest, sendGetRequest, sendPatchRequest } from "./GeneralUtils";

/* Codificación de Funciones */
// Función con la que obtenemos los clientes del back
const getClientsRequest = (route, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    }

    sendGetRequest(route, requestConfig, onSuccess, onError);

}

// Función con la que creamos un nuevo cliente en el back
const createClientsRequest = (route, client, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestData = {
        Nombre: client.Nombre,
        Apellidos: client.Apellidos,
        TipoCliente: client.TipoCliente,
        NIF_CIF: client.NIF_CIF,
        DireccionCliente: client.DireccionCliente,
        Telefono: client.Telefono,
        DireccionEntrega: client.DireccionEntrega,
        DescuentoVolumen: client.DescuentoVolumen
    };
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    }
    
    sendPostRequest(route, requestData, requestConfig, onSuccess, onError);

}

// Función con la que actualizamos un cliente en el back
const editClientsRequest = (route, client, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestData = {
        idCliente: client.idCliente,
        Nombre: client.Nombre,
        Apellidos: client.Apellidos,
        TipoCliente: client.TipoCliente,
        NIF_CIF: client.NIF_CIF,
        DireccionCliente: client.DireccionCliente,
        Telefono: client.Telefono,
        DireccionEntrega: client.DireccionEntrega,
        DescuentoVolumen: client.DescuentoVolumen
    };
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    }

    sendPatchRequest(route, requestData, requestConfig, onSuccess, onError);

}

// Función con la que eliminamos un cliente del back
const deleteClientRequest = (route, clientID, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestData = {
        idCliente: clientID
    };
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    };

    sendPatchRequest(route, requestData, requestConfig, onSuccess, onError);

}

// Exportado de funciones
export {
    getClientsRequest,
    createClientsRequest,
    editClientsRequest,
    deleteClientRequest
}