

/*
    Título: General Utils
    Descripción: Conjunto de utilidades genéricas
    Fecha: 06/01/2024
    Última Modificación: 06/01/2024
*/

/* Importado de Bibliotecas Externas */
import axios from "axios";

/* Codificación de funciones */
// Función con la que formateamos la fecha a enviar al back
const formatDate = (date) => {

    // Intercambiamos las / por - para tener el formato aaaa-mm-dd
    return date.includes("/") ? date.replaceAll("/", "-") : date;

}

// Función con la que lanzamos una petición GET al back
const sendGetRequest = (route, config = {}, onSuccess = () => {}, onError = () => {}) => {
    axios.get(route, config).then(onSuccess).catch(onError);
}

// Función con la que lanzamos una petición POST al back
const sendPostRequest = (route, data = {}, config = {}, onSuccess = () => {}, onError = () => {}) => {
    axios.post(route, data, config).then(onSuccess).catch(onError);
}

// Función con la que lanzamos una petición PATCH al back
const sendPatchRequest = (route, data = {}, config = {}, onSuccess = () => {}, onError = () => {}) => {
    axios.patch(route, data, config).then(onSuccess).catch(onError);
}

/* Exportado de funciones */
export {
    formatDate,
    sendGetRequest,
    sendPostRequest,
    sendPatchRequest
}