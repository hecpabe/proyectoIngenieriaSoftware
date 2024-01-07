

/*
    Título: App
    Descripción: Programa principal para gestionar la aplicación web
    Fecha: 27/11/2023
    Última Modificación: 12/12/2023
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
import React, { useState } from "react";
import {
    Routes,
    Route,
    BrowserRouter
} from "react-router-dom";
import { useLocalStorage } from "usehooks-ts"

// Bibliotecas de componentes propios
import Home from './components/home/Home'
import Login from "./components/login/Login";
import Workers from "./components/workers/Workers";
import RawMaterials from "./components/rawMaterials/RawMaterials";
import Products from "./components/products/Products";
import Clients from "./components/clients/Clients";
import Orders from "./components/orders/Orders";
import Bills from "./components/bills/Bills";

/* Componente Principal */
function App(){

    // Sesión
    const [sessionToken, setSessionToken] = useLocalStorage(process.env.REACT_APP_SESSION_COOKIE_NAME, "");
    const [isAdminWorker, setIsAdminWorker] = useLocalStorage(process.env.REACT_APP_ADMIN_COOKIE_NAME, false);

    // Barra de búsqueda
    const [searchValue, setSearchValue] = useState("");

    // Retornamos las rutas
    return(
        <BrowserRouter>
            <Routes>
                <Route 
                    path={process.env.REACT_APP_ROUTE_HOME} 
                    element={
                        <Home 
                            sessionToken={sessionToken} 
                            setSessionToken={setSessionToken} 
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            isAdminWorker={isAdminWorker}
                            setIsAdminWorker={setIsAdminWorker}
                        />
                    } 
                />
                <Route 
                    path={process.env.REACT_APP_ROUTE_WORKERS} 
                    element={
                        <Workers 
                            sessionToken={sessionToken} 
                            setSessionToken={setSessionToken} 
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            isAdminWorker={isAdminWorker}
                            setIsAdminWorker={setIsAdminWorker}
                        />
                    } 
                />
                <Route 
                    path={process.env.REACT_APP_ROUTE_LOGIN} 
                    element={
                        <Login 
                            sessionToken={sessionToken} 
                            setSessionToken={setSessionToken} 
                            setIsAdminWorker={setIsAdminWorker} 
                        />
                    } 
                />
                <Route 
                    path={process.env.REACT_APP_ROUTE_RAW_MATERIALS}
                    element={
                        <RawMaterials 
                            sessionToken={sessionToken}
                            setSessionToken={setSessionToken}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            isAdminWorker={isAdminWorker}
                            setIsAdminWorker={setIsAdminWorker}
                        />
                    }
                />
                <Route
                    path={process.env.REACT_APP_ROUTE_PRODUCTS}
                    element={
                        <Products
                            sessionToken={sessionToken}
                            setSessionToken={setSessionToken}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            isAdminWorker={isAdminWorker}
                            setIsAdminWorker={setIsAdminWorker}
                        />
                    }
                />
                <Route
                    path={process.env.REACT_APP_ROUTE_CLIENTS}
                    element={
                        <Clients 
                            sessionToken={sessionToken}
                            setSessionToken={setSessionToken}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            isAdminWorker={isAdminWorker}
                            setIsAdminWorker={setIsAdminWorker}
                        />
                    }
                />
                <Route
                    path={process.env.REACT_APP_ROUTE_ORDERS}
                    element={
                        <Orders 
                            sessionToken={sessionToken}
                            setSessionToken={setSessionToken}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            isAdminWorker={isAdminWorker}
                            setIsAdminWorker={setIsAdminWorker}
                        />
                    }
                />
                <Route
                    path={process.env.REACT_APP_ROUTE_BILLS}
                    element={
                        <Bills 
                            sessionToken={sessionToken}
                            setSessionToken={setSessionToken}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            isAdminWorker={isAdminWorker}
                            setIsAdminWorker={setIsAdminWorker}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );

}

export default App;