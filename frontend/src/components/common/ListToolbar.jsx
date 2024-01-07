

/*
    Título: List Toolbar
    Descripción: Componente con el que insertamos una toolbar para gestionar el filtrado y añadir elementos a una lista
    Fecha: 13/12/2023
    Última Modificación: 14/12/2023
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
import React, { useState } from "react";

// Primereact
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";

// Bibliotecas de componentes propios

/* Componente Principal */
function ListToolbar({filterButtons, addButtons, setSortField, setSortOrder}){

    // Estados
    const [filterButtonsState, setFilterButtonsState] = useState(filterButtons);

    // Función con la que gestionamos la pulsación de un botón de filtro
    const filterButtonClickEventHandler = (e, buttonID) => {

        // Recorremos la lista actual de botones de filtro buscando el que ha sido pulsado, el que ha sido pulsado se pone azul y se establece el orden
        // correspondiente, el resto se ponen grises y se establece el icono de filtro
        const newFilterButtons = filterButtonsState.map((button) => {
            if(button.id === buttonID){
                button.order = getNextFilterOrderState(button.order);
                button.icon = getFilterButtonIcon(button.order);
                setSortField(button.fieldName);
                setSortOrder(button.order === "asc" ? -1 : 1);
            }
            else{
                button.order = "none";
                button.icon = getFilterButtonIcon(button.order);
            }
            return button;
        });

        setFilterButtonsState(newFilterButtons);

    }

    // Función con la que construimos los botones de filtro
    const buildFilterButtons = (buttons) => {
        return buttons.map((button) => {
            return <Button 
                        label={button["label"]} 
                        icon={button["icon"]} 
                        severity={button.order === "none" ? "secondary" : "info"}
                        id={button["id"]} 
                        key={button["id"]} 
                        onClick={(e) => {
                            // Gestionamos la pulsación
                            filterButtonClickEventHandler(e, button["id"]);
                        }} 
                        className="mr-2" 
                    />
        });
    }

    // Función con la que construimos los botones de agregar
    const buildAddButtons = (buttons) => {
        return buttons.map((button) => {
            return <Button 
                        label={button["label"]} 
                        icon={button["icon"]} 
                        severity="success" 
                        id={button["id"]} 
                        key={button["id"]} 
                        onClick={button["onClick"]} 
                    />
        });
    }

    // Función con la que gestionamos el estado del orden de filtrado de un botón
    const getNextFilterOrderState = (currentFilterOrder) => {

        // Variables necesarias
        var nextFilterOrder = "";

        switch(currentFilterOrder){
            case "none":
            case "asc":
                nextFilterOrder = "desc";
                break;
            case "desc":
                nextFilterOrder = "asc";
                break;
            default:
                nextFilterOrder = "none";
                break;
        }

        return nextFilterOrder;

    }

    const getFilterButtonIcon = (filterOrder) => {

        var buttonIcon = "";

        switch(filterOrder){

            case "desc":
                buttonIcon = "pi pi-fw pi-angle-down";
                break;
            case "asc":
                buttonIcon = "pi pi-fw pi-angle-up";
                break;
            case "none":
            default:
                buttonIcon = "pi pi-fw pi-filter";
                break;

        }

        return buttonIcon;

    }

    // Construimos los botones de filtro
    const startButtons = buildFilterButtons(filterButtons);
    const startButtonsWrapped = <>{startButtons}</>

    // Construimos los botones de agregar
    const endButtons = buildAddButtons(addButtons);
    const endButtonsWrapped = <>{endButtons}</>

    // Retornamos el código HTML
    return(
        <>
            <div className="card">
                <Toolbar start={startButtonsWrapped} end={endButtonsWrapped} />
            </div>
        </>
    );

}

export default ListToolbar;