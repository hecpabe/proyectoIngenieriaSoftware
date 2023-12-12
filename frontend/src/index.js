

/*
    Título: Index
    Descripción: Creamos el index para inicializar las diferentes rutas de nuestra página web
    Fecha: 27/11/2023
    Última Modificación: 27/11/2023
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrimeReactProvider } from "primereact/api";

// CSS
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "/node_modules/primeflex/primeflex.css"
import 'primeicons/primeicons.css';

// Bibliotecas propias de componentes
import App from "./App"

/* Ejecución del Programa */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <PrimeReactProvider>
        <App />
    </PrimeReactProvider>
)