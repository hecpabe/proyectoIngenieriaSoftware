

/*
    Título: API Raw Materials Utils
    Descripción: Conjunto de utilidades para interactuar con la API de materias primas
    Fecha: 06/01/2024
    Última Modificación: 06/01/2024
*/

/* Importado de Bibliotecas Propias */
import { sendPostRequest, sendGetRequest, sendPatchRequest, formatDate } from "./GeneralUtils";

/* Codificación de Funciones */
// Función con la que obtenemos las materias primas del back
const getRawMaterialsRequest = (route, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    }

    sendGetRequest(route, requestConfig, onSuccess, onError);

}

// Función con la que creamos una nueva materia prima en el back
const createRawMaterialsRequest = (route, rawMaterial, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestData = {
        nombreMateriaPrima: rawMaterial.nombreMateriaPrima,
        Fecha: formatDate(rawMaterial.Fecha),
        Cantidad: rawMaterial.Cantidad,
        CodigoVinia: rawMaterial.CodigoVinia,
        DescripcionMateriaPrima: rawMaterial.DescripcionMateriaPrima,
        TipoUva: rawMaterial.TipoUva,
        GradoMadurez: rawMaterial.GradoMadurez,
        Valoracion: rawMaterial.Valoracion
    };
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    }

    sendPostRequest(route, requestData, requestConfig, onSuccess, onError);

}

// Función con la que actualizamos una materia prima en el back
const editRawMaterialsRequest = (route, rawMaterial, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestData = {
        idMateriaPrrima: rawMaterial.idMateriaPrrima,
        nombreMateriaPrima: rawMaterial.nombreMateriaPrima,
        Fecha: formatDate(rawMaterial.Fecha),
        Cantidad: rawMaterial.Cantidad,
        CodigoVinia: rawMaterial.CodigoVinia,
        DescripcionMateriaPrima: rawMaterial.DescripcionMateriaPrima,
        TipoUva: rawMaterial.TipoUva,
        GradoMadurez: rawMaterial.GradoMadurez,
        Valoracion: rawMaterial.Valoracion
    };
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    }

    sendPatchRequest(route, requestData, requestConfig, onSuccess, onError);

}

// Función con la que eliminamos una materia prima del back
const deleteRawMaterialRequest = (route, rawMaterialID, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestData = {
        idMateriaPrrima: rawMaterialID
    };
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    };

    sendPatchRequest(route, requestData, requestConfig, onSuccess, onError);

}

// Exportado de funciones
export {
    getRawMaterialsRequest,
    createRawMaterialsRequest,
    editRawMaterialsRequest,
    deleteRawMaterialRequest
}