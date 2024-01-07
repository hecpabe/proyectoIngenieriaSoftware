

/*
    Título: Session util
    Descripción: Conjunto de utilidades para gestionar la sesión
    Fecha: 12/12/2023
    Última Modificación: 12/12/2023
*/

/* Importado de bibliotecas propias */
import { sendPostRequest } from "./GeneralUtils";

/* Codificación de funciones */
const checkSessionToken = (sessionToken) => {
    if(sessionToken === undefined || sessionToken === "")
        return false;
    else
        return true;
}

const closeSession = (setSessionToken, setIsAdminWorker) => {
    setSessionToken("");
    setIsAdminWorker(false);
}

const loginUserRequest = (route, password, onSuccess = () => {}, onError = () => {}) => {
    
    // Variables necesarias
    const requestData = {
        CodigoEmpresa: password
    }

    sendPostRequest(route, requestData, {}, onSuccess, onError);
}

/* Exportado de funciones */
export {
    checkSessionToken,
    closeSession,
    loginUserRequest
}