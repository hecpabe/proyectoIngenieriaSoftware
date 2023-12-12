

/*
    Título: App
    Descripción: Programa principal para gestionar la aplicación web
    Fecha: 27/11/2023
    Última Modificación: 12/12/2023
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
import React from "react";
import {
    Routes,
    Route,
    BrowserRouter
} from "react-router-dom";
import { useLocalStorage } from "usehooks-ts"

// Bibliotecas de componentes propios
import Home from './components/home/Home'
import Login from "./components/login/Login";

/* Componente Principal */
function App(){

    // Sesión
    const [sessionToken, setSessionToken] = useLocalStorage(process.env.REACT_APP_SESSION_COOKIE_NAME, "");

    // Retornamos las rutas
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login sessionToken={sessionToken} setSessionToken={setSessionToken} />} />
            </Routes>
        </BrowserRouter>
    );

}

export default App;