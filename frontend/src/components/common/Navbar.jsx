

/*
    Título: Navbar
    Descripción: Componente del menú de navegación de la aplicación
    Fecha: 12/12/2023
    Última Modificación: 14/12/2023
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
import React from "react";
import { useNavigate } from "react-router-dom";

// Primereact
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";

// Bibliotecas de componentes propios
import { closeSession } from "../../util/SessionUtils";

/* Componente Principal */
function Navbar({searchValue, setSearchValue, setSessionToken, isAdminWorker, setIsAdminWorker}){

    // Declaraciones
    const navigate = useNavigate();

    // Funciones

    // Items del menú
    const menuItems = [
        {
            label: "Añada Master - Inicio",
            icon: "pi pi-fw pi-home",
            command: () => {
                navigate(process.env.REACT_APP_ROUTE_HOME);
            }
        },
        {
            label: "Core bodega",
            icon: "pi pi-fw pi-building",
            items: [
                {
                    label: "Materias primas",
                    icon: "pi pi-fw pi-box",
                    command: () => {
                        navigate(process.env.REACT_APP_ROUTE_RAW_MATERIALS);
                    }
                },
                {
                    label: "Personal",
                    icon: "pi pi-fw pi-briefcase",
                    command: () => {
                        navigate(process.env.REACT_APP_ROUTE_WORKERS);
                    },
                    disabled: !isAdminWorker
                }
            ]
        },
        {
            label: "Core reservas",
            icon: "pi pi-fw pi-file",
            items: [
                {
                    label: "Productos",
                    icon: "pi pi-fw pi-tags",
                    command: () =>{
                        navigate(process.env.REACT_APP_ROUTE_PRODUCTS);
                    }
                },
                {
                    label: "Clientes",
                    icon: "pi pi-fw pi-users",
                    command: () =>{
                        navigate(process.env.REACT_APP_ROUTE_CLIENTS);
                    }
                },
                {
                    label: "Pedidos",
                    icon: "pi pi-fw pi-shopping-cart",
                    command: () =>{
                        navigate(process.env.REACT_APP_ROUTE_ORDERS);
                    }
                },
                {
                    label: "Facturas",
                    icon: "pi pi-fw pi-credit-card",
                    command: () =>{
                        navigate(process.env.REACT_APP_ROUTE_BILLS);
                    }
                }
            ]
        },
        {
            label: "Cerrar sesión",
            icon: "pi pi-fw pi-sign-out",
            command: () => {
                closeSession(setSessionToken, setIsAdminWorker);
            }
        }
    ]
    
    const menuEnd = <InputText placeholder="Buscar" type="text" className="w-full" value={searchValue} onInput={(e) => {
        setSearchValue(e.target.value);
    }} />;

    // Retornamos el código HTML
    return(
        <>
            <div className="card">
                <Menubar model={menuItems} end={menuEnd} />
            </div>
        </>
    );

}

export default Navbar;