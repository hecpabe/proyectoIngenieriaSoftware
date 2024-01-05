

/*
    Título: Home
    Descripción: Creamos un componente que albergue la landing page de nuestra aplicación
    Fecha: 27/11/2023
    Última Modificación: 14/12/2023
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Bibliotecas de componentes propios
import Navbar from "../common/Navbar";

// Utilidades
import { checkSessionToken } from "../../util/SessionUtils";

/* Componente Principal */
function Home({sessionToken, setSessionToken, searchValue, setSearchValue}){

    // Navigation
    const navigate = useNavigate();

    // Variables necesarias
    const sessionEstablished = checkSessionToken(sessionToken);

    // Comprobamos que la sesión esté iniciada
    useEffect(() => {
        if(!sessionEstablished){
            navigate(process.env.REACT_APP_ROUTE_LOGIN + "?referrer=" + process.env.REACT_APP_ROUTE_HOME)
        }
    }, [sessionToken]);

    // Retornamos el código HTML
    return(
        <>
            {   sessionEstablished && 
                <Navbar setSessionToken={setSessionToken} searchValue={searchValue} setSearchValue={setSearchValue} />
            }
        </>
    );

}

export default Home;