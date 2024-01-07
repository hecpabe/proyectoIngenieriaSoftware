

/*
    Título: Clients List
    Descripción: Componente para la lista de personal
    Fecha: 06/01/2024
    Última Modificación: 06/01/2024
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
import React from "react";

// Primereact
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { confirmDialog } from "primereact/confirmdialog";

// Bibliotecas de componentes propios

// Bibliotecas de utilidades propias
import { closeSession } from "../../util/SessionUtils";
import { deleteClientRequest } from "../../util/APIClientsUtils";

/* Componente Principal */
function ClientsList({clients, setClients, setClientToEdit, setClientToView, sortField, sortOrder, searchValue, sessionToken, setSessionToken, setIsAdminClient, messagesQueue}){

    // Filtramos los clientes en función el search value
    const filteredClients = clients.filter(client => 
        searchValue === "" ||
        client.NombreCompleto.toLowerCase().includes(searchValue.toLowerCase()) ||
        client.TipoCliente.toLowerCase().includes(searchValue.toLowerCase()) ||
        client.NIF_CIF.toLowerCase().includes(searchValue.toLowerCase()) ||
        client.Telefono.toString().toLowerCase().includes(searchValue.toLowerCase())
    );

    // Recorremos a los clientes insertándoles sus iniciales
    for(let i = 0; i < filteredClients.length; i++){
        var label = "";
        (filteredClients[i].Nombre + filteredClients[i].Apellidos).split(" ").map((name) => {
            label += name.charAt(0);
        });
        filteredClients[i]["label"] = label;
    }

    // Plantilla de elemento de la lista de clientes
    const clientsTemplate = (client) => {
        return (
            <>
                <div className="col-12">
                    <div className="flex">
                        <div className="col-8">
                            <div className="flex">
                                <div className="flex align-items-center mr-4">
                                    <Avatar label={client.label} size="xlarge" shape="circle" />
                                </div>
                                <div>
                                    <h3>{client.NombreCompleto}</h3>
                                    <p>Tipo de cliente: {client.TipoCliente}</p>
                                    <p>NIF/CIF: {client.NIF_CIF}</p>
                                    <p>Teléfono: {client.Telefono}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 flex justify-content-end">
                            <div>
                                <Button icon="pi pi-fw pi-eye" severity="info" className="mr-2" onClick={
                                    () => {
                                        setClientToView(client);
                                    }
                                } />
                                <Button icon="pi pi-fw pi-pencil" severity="help" className="mr-2" onClick={
                                    () => {
                                        setClientToEdit(client);
                                    }
                                } />
                                <Button icon="pi pi-fw pi-times-circle" severity="danger" onClick={
                                    () => {
                                        confirmDialog({
                                            message: '¿Desea eliminar al cliente del sistema?',
                                            header: 'Confirmación de eliminación',
                                            icon: 'pi pi-info-circle',
                                            acceptClassName: 'p-button-danger',
                                            acceptLabel: 'Sí',
                                            rejectLabel: 'No',
                                            accept: () => {
                                                // Función callback en caso de que la petición sea correcta
                                                const onDeleteClientSuccess = (data) => {
                                                    // Sacamos al cliente de la lista
                                                    const newClients = clients.filter(currentClient => currentClient.idCliente != client.idCliente);
                                                    setClients(newClients);
                                                    messagesQueue.current.show([
                                                        { severity: "success", summary: "Cliente eliminado", detail: "El cliente ha sido eliminado con éxito", sticky: true }
                                                    ])
                                                }
                                                
                                                // Función callback en caso de que la petición sea erronea
                                                const onDeleteClientError = (error) => {
                                                    // Si el error es un 401 (Unauthorized) hay un error con la sesión, por lo que la cerramos
                                                    if(error.response.status === 401){
                                                        closeSession(setSessionToken, setIsAdminClient);
                                                    }
                                                    // Sino, mostramos que ha ocurrido un error
                                                    else{
                                                        messagesQueue.current.show([
                                                            { severity: "error", summary: "Error al eliminar el cliente", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                                                        ])
                                                    }
                                                }

                                                // Lanzamos la petición
                                                deleteClientRequest(process.env.REACT_APP_BACK_ROUTE_DELETE_CLIENTS, client.idCliente, sessionToken, onDeleteClientSuccess, onDeleteClientError);
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
                <DataView value={filteredClients} itemTemplate={clientsTemplate} sortField={sortField} sortOrder={sortOrder} />
            </div>
        </>
    );

}

export default ClientsList;