

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

/* Componente Principal */
function Navbar({searchValue, setSearchValue, setSessionToken}){

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
                    label: "Materia prima",
                    icon: "pi pi-fw pi-box"
                },
                {
                    label: "Personal",
                    icon: "pi pi-fw pi-briefcase",
                    command: () => {
                        navigate(process.env.REACT_APP_ROUTE_WORKERS)
                    }
                }
            ]
        },
        {
            label: "Core reservas",
            icon: "pi pi-fw pi-file",
            items: [
                {
                    label: "Productos",
                    icon: "pi pi-fw pi-tags"
                },
                {
                    label: "Clientes",
                    icon: "pi pi-fw pi-users"
                },
                {
                    label: "Pedidos",
                    icon: "pi pi-fw pi-shopping-cart"
                },
                {
                    label: "Facturas",
                    icon: "pi pi-fw pi-credit-card"
                }
            ]
        },
        {
            label: "Cerrar sesión",
            icon: "pi pi-fw pi-sign-out",
            command: () => {
                setSessionToken("");
            }
        }
    ]
    
    const menuEnd = <InputText placeholder="Buscar" type="text" className="w-full" value={searchValue} onInput={(e) => {
        setSearchValue(e.target.value);
    }} />;

    // TODO: Hacer que si el usuario no es administrador no pueda acceder al apartado de personal

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