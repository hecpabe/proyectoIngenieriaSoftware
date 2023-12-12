

/*
    Título: Session util
    Descripción: Conjunto de utilidades para gestionar la sesión
    Fecha: 12/12/2023
    Última Modificación: 12/12/2023
*/

/* Importado de bibliotecas externas */

/* Codificación de funciones */
const checkSessionToken = (sessionToken) => {
    if(sessionToken === undefined || sessionToken === "")
        return false;
    else
        return true;
}

/* Exportado de funciones */
export {
    checkSessionToken
}