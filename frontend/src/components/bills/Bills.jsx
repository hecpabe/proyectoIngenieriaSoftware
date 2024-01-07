/*
    Título: Bills
    Descripción: Componente con el que gestionamos la vista de las facturas
    Fecha: 07/01/2024
    Última Modificación: 07/01/2024
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Prime react
import { ConfirmDialog } from "primereact/confirmdialog";
import { Messages } from "primereact/messages";

// Bibliotecas de componentes propios
import Navbar from "../common/Navbar";
import ListToolbar from "../common/ListToolbar";
import BillsList from "./BillsList";
import VerFactura from "../edit/VerFactura";

// Utilidades propias
import { checkSessionToken, closeSession } from "../../util/SessionUtils";
import { getOrdersRequest } from "../../util/APIOrdersUtils";

// Declaraciones constantes
const filterButtons = [
    {
        id: "btn_filter_client",
        label: "Cliente",
        icon: "pi pi-fw pi-filter",
        fieldName: "NombreCompleto",
        order: "none"
    },
    {
        id: "btn_filter_state",
        label: "Estado",
        icon: "pi pi-fw pi-filter",
        fieldName: "Estado",
        order: "none"
    },
    {
        id: "btn_filter_bottles",
        label: "Cantidad de botellas",
        icon: "pi pi-fw pi-filter",
        fieldName: "CantidadBotellas",
        order: "none"
    },
    {
        id: "btn_filter_discount",
        label: "Descuento",
        icon: "pi pi-fw pi-filter",
        fieldName: "DescuentoAplicado",
        order: "none"
    }
];

const addButtons = [];

/* Componente Principal */
function Bills({sessionToken, setSessionToken, searchValue, setSearchValue, isAdminWorker, setIsAdminWorker}){

    // Estados
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState(0);

    const [bills, setBills] = useState([]);

    const [billToView, setBillToView] = useState(null);

    // Navigation
    const navigate = useNavigate();

    // Referencias
    const messagesQueue = useRef(null);

    // Variables necesarias
    const sessionEstablished = checkSessionToken(sessionToken);

    // Comprobamos que la sesión esté iniciada
    useEffect(() => {
        if(!sessionEstablished){
            navigate(process.env.REACT_APP_ROUTE_LOGIN + "?referrer=" + process.env.REACT_APP_ROUTE_BILLS)
        }
    }, [sessionToken]);

    // Obtenemos la lista de pedidos del back
    // Función en caso de que la consulta sea correcta
    const onOrdersGetSuccess = (data) => {
        setBills(data.data.map((order => {
            var newOrder = order;
            newOrder["NombreCompleto"] = `${order.Nombre} ${order.Apellidos}`;
            return newOrder;
        })).filter(order => order.Estado === "Liquidado" || order.Estado === "Entregado" || order.Estado === "Cerrado"));
    }
    
    // Función en caso de que la consulta sea erronea
    const onOrdersGetError = (error) => {
        console.log("ERROR");
        console.log(error);

        // Si el código de error es 401 (Unauthorized) hay un error en la sesión, por lo que se cierra
        if(error.response.status === 401){
            closeSession(setSessionToken, setIsAdminWorker);
        }
        // Sino, mostramos que ha ocurrido un error
        else{
            messagesQueue.current.show([
                { severity: "error", summary: "Error al obtener la lista de pedidos", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
            ])
        }
    }

    // Lanzamos la petición
    useEffect(() => {
        getOrdersRequest(process.env.REACT_APP_BACK_ROUTE_GET_ORDERS, sessionToken, onOrdersGetSuccess, onOrdersGetError);
    }, []);

    // Retornamos el código HTML
    return(
        <>
            {
                sessionEstablished &&
                <div>
                    <ConfirmDialog />
                    <Navbar 
                        setSessionToken={setSessionToken} 
                        searchValue={searchValue} 
                        setSearchValue={setSearchValue} 
                        isAdminWorker={isAdminWorker} 
                        setIsAdminWorker={setIsAdminWorker} 
                    />
                    <div className="flex justify-content-center">
                        <h1>Facturas</h1>
                    </div>
                    <div className="flex justify-content-center">
                        {/* Alertas */}
                        <Messages ref={messagesQueue} />
                    </div>
                    <div className="flex justify-content-center">
                        <ListToolbar filterButtons={filterButtons} addButtons={addButtons} setSortField={setSortField} setSortOrder={setSortOrder} />
                    </div>
                    <div className="flex justify-content-center">
                        <div className="col-6 mt-2">
                            <BillsList 
                                bills={bills} 
                                setBills={setBills} 
                                setBillToView={setBillToView}
                                sortField={sortField} 
                                sortOrder={sortOrder} 
                                searchValue={searchValue}
                                sessionToken={sessionToken}
                                setSessionToken={setSessionToken}
                                setIsAdminWorker={setIsAdminWorker}
                                messagesQueue={messagesQueue}
                            />
                        </div>
                    </div>
                </div>
            }
            {
                billToView &&
                <VerFactura pedido={billToView} visible={Boolean(billToView)} onHideDialog={() => setBillToView(null)} />
            }
        </>
    );

}

export default Bills;