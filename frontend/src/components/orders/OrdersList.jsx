

/*
    Título: Orders List
    Descripción: Componente con el que gestionamos la lista de pedidos
    Fecha: 07/01/2024
    Última Modificación: 07/01/2024
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
import React from "react";

// Primereact
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { confirmDialog } from "primereact/confirmdialog";

// Utilidades propias
import { closeSession } from "../../util/SessionUtils";
import { deleteOrderRequest } from "../../util/APIOrdersUtils";

/* Componente Principal */
function OrdersList({orders, setOrders, setOrderToEdit, setOrderToView, sortField, sortOrder, searchValue, sessionToken, setSessionToken, setIsAdminWorker, messagesQueue}){

    // Filtramos los pedidos en función el search value
    const filteredOrders = orders.filter(order => 
        searchValue === "" ||
        ("Pedido de " + order.NombreCompleto).toLowerCase().includes(searchValue.toLowerCase()) ||
        order.Estado.toLowerCase().includes(searchValue.toLowerCase()) ||
        order.CantidadBotellas.toLowerCase().includes(searchValue.toLowerCase()) ||
        order.DescuentoAplicado.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Plantilla de elemento de la lista de pedidos
    const ordersTemplate = (order) => {
        return(
            <>
                <div className="col-12">
                    <div className="flex">
                        <div className="col-8">
                            <div className="flex">
                                <div className="flex align-items-center mr-4">
                                    <Image src={process.env.REACT_APP_SHIPPING_LOGO + "?a=1"} alt="Image" width="150" />
                                </div>
                                <div>
                                    <h3>Pedido de {order.NombreCompleto}</h3>
                                    <p>Estado: {order.Estado}</p>
                                    <p>Cantidad de botellas: {order.CantidadBotellas}</p>
                                    <p>Descuento aplicado: {order.DescuentoAplicado}%</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 flex justify-content-end">
                            <div>
                                <Button icon="pi pi-fw pi-pencil" severity="help" className="mr-2" onClick={
                                    () => {
                                        setOrderToEdit(order);
                                    }
                                } />
                                <Button icon="pi pi-fw pi-times-circle" severity="danger" onClick={
                                    () => {
                                        confirmDialog({
                                            message: '¿Desea eliminar el pedido del sistema?',
                                            header: 'Confirmación de eliminación',
                                            icon: 'pi pi-info-circle',
                                            acceptClassName: 'p-button-danger',
                                            acceptLabel: 'Sí',
                                            rejectLabel: 'No',
                                            accept: () => {
                                                // Función callback en caso de que la petición sea correcta
                                                const onDeleteOrderSuccess = (data) => {
                                                    // Sacamos el pedido de la lista
                                                    const newOrders = orders.filter(currentOrder => currentOrder.idPedido != order.idPedido);
                                                    setOrders(newOrders);
                                                    messagesQueue.current.show([
                                                        { severity: "success", summary: "Pedido eliminado", detail: "El pedido ha sido eliminado con éxito", sticky: true }
                                                    ])
                                                }
                                                
                                                // Función callback en caso de que la petición sea erronea
                                                const onDeleteOrderError = (error) => {
                                                    // Si el error es un 401 (Unauthorized) hay un error con la sesión, por lo que la cerramos
                                                    if(error.response.status === 401){
                                                        closeSession(setSessionToken, setIsAdminWorker);
                                                    }
                                                    // Sino, mostramos que ha ocurrido un error
                                                    else{
                                                        messagesQueue.current.show([
                                                            { severity: "error", summary: "Error al eliminar el pedido", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                                                        ])
                                                    }
                                                }

                                                // Lanzamos la petición
                                                deleteOrderRequest(process.env.REACT_APP_BACK_ROUTE_DELETE_ORDERS, order.idPedido, sessionToken, onDeleteOrderSuccess, onDeleteOrderError);
                                            }
                                        });
                                    }
                                } />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Retornamos el código HTML
    return(
        <>
            <div className="card">
                <DataView value={filteredOrders} itemTemplate={ordersTemplate} sortField={sortField} sortOrder={sortOrder} />
            </div>
        </>
    );

}

export default OrdersList;