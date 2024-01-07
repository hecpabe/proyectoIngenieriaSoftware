

/*
    Título: Orders
    Descripción: Componente principal de la página de pedidos
    Fecha: 06/01/2023
    Última Modificación: 06/01/2023
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
import OrdersList from "./OrdersList";
import EditarPedido from "../edit/EditarPedido";

// Utilidades propias
import { checkSessionToken, closeSession } from "../../util/SessionUtils";
import { getOrdersRequest, createOrdersRequest, editOrdersRequest } from "../../util/APIOrdersUtils";
import { getClientsRequest } from "../../util/APIClientsUtils";
import { getProductsRequest } from "../../util/APIProductsUtils";

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

const addButtons = [
    {
        id: "btn_add1",
        label: "Agregar pedido",
        icon: "pi pi-fw pi-plus",
        onClick: () => {
            console.log("FUNCIONA BOTON 1");
        }
    }
];

/* Componente Principal */
function Orders({sessionToken, setSessionToken, searchValue, setSearchValue, isAdminWorker, setIsAdminWorker}){

    // Estados
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState(0);

    const [orders, setOrders] = useState([]);

    const [orderToEdit, setOrderToEdit] = useState(null);
    const [orderToCreate, setOrderToCreate] = useState(null);
    const [orderToView, setOrderToView] = useState(null);

    // Navigation
    const navigate = useNavigate();

    // Referencias
    const messagesQueue = useRef(null);

    // Variables necesarias
    const sessionEstablished = checkSessionToken(sessionToken);

    // Event handler para la creación de pedidos
    const handleCreateOrder = (newOrder) => {

        const newOrderFormated = newOrder;

        newOrderFormated.idClienteFK = newOrder.idCliente;
        newOrderFormated.datosProductos = newOrder.Productos.map((product) => {
            newOrderFormated.CantidadBotellas += newOrder["cantidad_" + product];
            return {
                idProducto: product,
                Cantidad: newOrder["cantidad_" + product]
            };
        });
        
        // Función en caso de que la consulta sea correcta
        const onCreateOrderSuccess = (data) => {
            // Recargamos la página para que se vuelvan a pedir los datos al back
            window.location.reload();
        }

        // Función en caso de que la consulta sea erronea
        const onCreateOrderError = (error) => {
            // Variables necesarias
            const errorData = error.response.data;

            // Si el dato es un objeto, hay errores en la inserción de datos
            if(typeof errorData === "object"){
                // Mostramos el mensaje de error
                var errorParams = "";
                errorData.errors.map((errorParam) => {
                    if(!errorParams.includes(errorParam.param))
                        errorParams += ("\n" + errorParam.param);
                    return;
                });
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al agregar el pedido", detail: `Hay errores en la inserción de los siguientes parámetros:${errorParams}`, sticky: true }
                ])
            }
            // Si el código de respuesta es 401 (Unauthorized) hay un error en la sesión, por lo que cerramos la sesión
            else if(error.response.status === 401){
                closeSession(setSessionToken, setIsAdminWorker);
            }
            // Sino, mostramos que ha ocurrido un error desconocido
            else{
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al agregar el pedido", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                ])
            }
        }

        // Lanzamos la petición
        createOrdersRequest(process.env.REACT_APP_BACK_ROUTE_CREATE_ORDERS, newOrderFormated, sessionToken, onCreateOrderSuccess, onCreateOrderError);

    }

    // Event handler para la edición de pedidos
    const handleEditOrder = (editedOrder) => {

        const editedOrderFormated = editedOrder;

        editedOrder.Clientes.map((client) => {
            if(editedOrder.NombreCompleto === client[1])
                editedOrderFormated.idClienteFK = client[0];
            return;
        });

        // Función en caso de que la consulta sea correcta
        const onEditOrderSuccess = (data) => {
            // Actualizamos la lista de pedidos un mensaje de éxito
            setOrders(orders.map(order =>
                order.idPedido === editedOrderFormated.idPedido ? editedOrderFormated : order
            ));
            setOrderToEdit(null);

            messagesQueue.current.show([
                { severity: "success", summary: "Modificación del pedido", detail: "Pedido modificado con éxito", sticky: true }
            ])
        }

        // Función en caso de que la consulta sea erronea
        const onEditOrderError = (error) => {
            // Variables necesarias
            const errorData = error.response.data;

            // Si el dato es un objeto, hay errores en la inserción de datos
            if(typeof errorData === "object"){
                // Mostramos el mensaje de error
                var errorParams = "";
                errorData.errors.map((errorParam) => {
                    if(!errorParams.includes(errorParam.param))
                        errorParams += ("\n" + errorParam.param);
                    return;
                });
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al editar el pedido", detail: `Hay errores en la inserción de los siguientes parámetros:${errorParams}`, sticky: true }
                ])
            }
            // Si tenemos un 401 (Unautorized) hay un error con la sesión, la cerramos
            else if (error.response.status === 401){
                closeSession(setSessionToken, setIsAdminWorker);
            }
            // Sino, mostramos que ha ocurrido un error desconocido
            else{
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al editar el pedido", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                ])
            }
        }

        editOrdersRequest(process.env.REACT_APP_BACK_ROUTE_UPDATE_ORDERS, editedOrderFormated, sessionToken, onEditOrderSuccess, onEditOrderError);

    }

    // Creamos el event handler del onclick del botón de agregar
    addButtons[0].onClick = () => {
        const newOrder = {
            idPedido: orders.length + 1,
            idCliente: 0,
            NombreCompleto: '',
            Estado: '',
            CantidadBotellas: 0,
            DescuentoAplicado: 0,
            datosProductos: []
        };
    
        const onClientsGetSuccess = (data) => {
            newOrder.Clientes = data.data.map((client) => [client.idCliente, `${client.Nombre} ${client.Apellidos}`]);
            
            const onProductsGetSuccess = (productsData) => {
                newOrder.Productos = productsData.data.map((product) => product.idProducto);
                newOrder.Productos.map((product) => {
                    newOrder["cantidad_" + product] = 0;
                });
                setOrderToCreate(newOrder);
            }
            const onProductsGetError = (error) => {
                /* console.log("ERROR");
                console.log(error); */

                // Si el código de error es 401 (Unauthorized) hay un error en la sesión, por lo que se cierra
                if(error.response.status === 401){
                    closeSession(setSessionToken, setIsAdminWorker);
                }
                // Sino, mostramos que ha ocurrido un error
                else{
                    messagesQueue.current.show([
                        { severity: "error", summary: "Error al obtener la lista de productos", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                    ])
                }
            }

            getProductsRequest(process.env.REACT_APP_BACK_ROUTE_GET_PRODUCTS, sessionToken, onProductsGetSuccess, onProductsGetError);

        }
        const onClientsGetError = (error) => {
            /* console.log("ERROR");
            console.log(error); */

            // Si el código de error es 401 (Unauthorized) hay un error en la sesión, por lo que se cierra
            if(error.response.status === 401){
                closeSession(setSessionToken, setIsAdminWorker);
            }
            // Sino, mostramos que ha ocurrido un error
            else{
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al obtener la lista de clientes", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                ])
            }
        }

        getClientsRequest(process.env.REACT_APP_BACK_ROUTE_GET_CLIENTS, sessionToken, onClientsGetSuccess, onClientsGetError);

    };

    // Comprobamos que la sesión esté iniciada
    useEffect(() => {
        if(!sessionEstablished){
            navigate(process.env.REACT_APP_ROUTE_LOGIN + "?referrer=" + process.env.REACT_APP_ROUTE_ORDERS)
        }
    }, [sessionToken]);

    // Obtenemos la lista de pedidos del back
    // Función en caso de que la petición sea correcta
    const onOrdersGetSuccess = (data) => {

        const ordersGot = data.data;

        // Pedimos los clientes y los productos
        const onClientsGetSuccess = (clientsData) => {
            const clientsGot = clientsData.data;

            const onProductsGetSuccess = (productsData) => {
                const productsGot = productsData.data;

                // Agregamos los datos a los pedidos
                const newOrders = ordersGot;
                ordersGot.map((currentOrder) => {
                    currentOrder.Clientes = clientsGot.map((currentClient) => {
                        return [currentClient.idCliente, `${currentClient.Nombre} ${currentClient.Apellidos}`];
                    });
                    currentOrder.Productos = productsGot.map((currentProduct) => {
                        currentOrder["cantidad_" + currentProduct] = 0;
                        return currentProduct;
                    });
                    currentOrder["NombreCompleto"] = `${currentOrder.Nombre} ${currentOrder.Apellidos}`;
                });

                // Agregamos los pedidos a la lista agregando el nombre completo del cliente
                setOrders(newOrders);

            }
            const onProductsGetError = (error) => {
                console.log("ERROR");
                console.log(error);

                // Si el código de error es 401 (Unauthorized) hay un error en la sesión, por lo que se cierra
                if(error.response.status === 401){
                    closeSession(setSessionToken, setIsAdminWorker);
                }
                // Sino, mostramos que ha ocurrido un error
                else{
                    messagesQueue.current.show([
                        { severity: "error", summary: "Error al obtener la lista de productos", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                    ])
                }
            }

            getProductsRequest(process.env.REACT_APP_BACK_ROUTE_GET_PRODUCTS, sessionToken, onProductsGetSuccess, onProductsGetError);


        }
        const onClientsGetError = (error) => {
            /* console.log("ERROR");
            console.log(error); */

            // Si el código de error es 401 (Unauthorized) hay un error en la sesión, por lo que se cierra
            if(error.response.status === 401){
                closeSession(setSessionToken, setIsAdminWorker);
            }
            // Sino, mostramos que ha ocurrido un error
            else{
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al obtener la lista de clientes", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                ])
            }
        }

        getClientsRequest(process.env.REACT_APP_BACK_ROUTE_GET_CLIENTS, sessionToken, onClientsGetSuccess, onClientsGetError);

    };

    // Función en caso de que la petición sea erronea
    const onOrdersGetError = (error) => {
        /* console.log("ERROR");
        console.log(error); */

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
                        <h1>Pedidos</h1>
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
                            <OrdersList 
                                orders={orders} 
                                setOrders={setOrders} 
                                setOrderToEdit={setOrderToEdit}
                                setOrderToView={setOrderToView}
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
                orderToEdit &&
                <EditarPedido pedido={orderToEdit} visible={Boolean(orderToEdit)} onHideDialog={() => setOrderToEdit(null)} onSavePedido={handleEditOrder} isEditing={true} />
            }
            {
                orderToCreate &&
                <EditarPedido pedido={orderToCreate} visible={Boolean(orderToCreate)} onHideDialog={() => setOrderToCreate(null)} onSavePedido={handleCreateOrder} isEditing={false} />
            }
        </>
    );

}

export default Orders;