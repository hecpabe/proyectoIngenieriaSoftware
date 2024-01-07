

/*
    Título: API Workers Utils
    Descripción: Conjunto de utilidades para la interacción con la API de trabajadores
    Fecha: 06/01/2024
    Última Modificación: 06/01/2024
*/

/* Importado de Bibliotecas Propias */
import { sendPostRequest, sendGetRequest, sendPatchRequest, formatDate } from "./GeneralUtils";

/* Codificación de Funciones */
// Función con la que agregamos un nuevo empleado a la API
const addWorkerRequest = (route, worker, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const workerPhoneNumber = parseInt(worker.Telefono);
    const workerEmergencyContact = parseInt(worker.ContactoEmergencia);
    const requestData = {
        NIF: worker.NIF,
        Nombre: worker.Nombre,
        Apellidos: worker.Apellidos,
        FechaNacimiento: formatDate(worker.FechaNacimiento),
        Domicilio: worker.Domicilio,
        Telefono: workerPhoneNumber === NaN ? 0 : workerPhoneNumber,
        ContactoEmergencia: workerEmergencyContact === NaN ? 0 : workerEmergencyContact,
        CategoriaLaboral: worker.CategoriaLaboral,
        FechaIngreso: formatDate(worker.FechaIngreso),
        NumHijos: worker.NumHijos,
        EstadoCivil: worker.EstadoCivil,
        IBAN: worker.IBAN,
        CodigoEmpresa: worker.CodigoEmpresa
    }

    sendPostRequest(route, requestData, {}, onSuccess, onError);

}

const getWorkersRequest = (route, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    }

    sendGetRequest(route, requestConfig, onSuccess, onError);

}

const updateWorkerRequest = (route, worker, sessionToken, onSuccess = () => {}, onError = () => {}) => {
    
    // Variables necesarias
    const workerPhoneNumber = parseInt(worker.Telefono);
    const workerEmergencyContact = parseInt(worker.ContactoEmergencia);
    const requestData = {
        idPersonal: worker.idPersonal,
        NIF: worker.NIF,
        Nombre: worker.Nombre,
        Apellidos: worker.Apellidos,
        FechaNacimiento: formatDate(worker.FechaNacimiento),
        Domicilio: worker.Domicilio,
        Telefono: workerPhoneNumber === NaN ? 0 : workerPhoneNumber,
        ContactoEmergencia: workerEmergencyContact === NaN ? 0 : workerEmergencyContact,
        CategoriaLaboral: worker.CategoriaLaboral,
        FechaIngreso: formatDate(worker.FechaIngreso),
        NumHijos: worker.NumHijos,
        EstadoCivil: worker.EstadoCivil,
        IBAN: worker.IBAN,
        CodigoEmpresa: worker.CodigoEmpresa
    }
    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    }

    sendPatchRequest(route, requestData, requestConfig, onSuccess, onError);

}

const deleteWorkerRequest = (route, workerID, sessionToken, onSuccess = () => {}, onError = () => {}) => {

    // Variables necesarias
    const requestData = {
        idPersonal: workerID
    }

    const requestConfig = {
        headers: { Authorization: `Bearer ${sessionToken}` }
    }

    sendPatchRequest(route, requestData, requestConfig, onSuccess, onError);

}

/* Exportado de Funciones */
export {
    addWorkerRequest,
    getWorkersRequest,
    updateWorkerRequest,
    deleteWorkerRequest
}