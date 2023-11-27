

/*
    Título: App
    Descripción: Programa principal para gestionar la aplicación web
    Fecha: 27/11/2023
    Última Modificación: 27/11/2023
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
import React from "react";
import {
    Routes,
    Route,
    BrowserRouter
} from "react-router-dom";

// Bibliotecas de componentes propios
import Home from './components/home/Home'

/* Componente Principal */
function App(){

    // Retornamos las rutas
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );

}

export default App;