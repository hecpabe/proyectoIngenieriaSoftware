

/*
    Título: Clients
    Descripción: Componente principal de la página de clientes
    Fecha: 06/01/2024
    Última Modificación: 06/01/2024
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
import ClientsList from "./ClientsList";
import EditarCliente from "../edit/EditarCliente";
import VerCliente from "../edit/VerCliente";

// Utilidades propias
import { checkSessionToken, closeSession } from "../../util/SessionUtils";
import { getClientsRequest, createClientsRequest, editClientsRequest } from "../../util/APIClientsUtils";

// Declaraciones constantes
const filterButtons = [
    {
        id: "btn_filter_name",
        label: "Nombre",
        icon: "pi pi-fw pi-filter",
        fieldName: "NombreCompleto",
        order: "none"
    },
    {
        id: "btn_filter_client_type",
        label: "Tipo de cliente",
        icon: "pi pi-fw pi-filter",
        fieldName: "TipoCliente",
        order: "none"
    },
    {
        id: "btn_filter_nif",
        label: "NIF/CIF",
        icon: "pi pi-fw pi-filter",
        fieldName: "NIF_CIF",
        order: "none"
    },
    {
        id: "btn_filter_phone",
        label: "Teléfono",
        icon: "pi pi-fw pi-filter",
        fieldName: "Telefono",
        order: "none"
    }
];

const addButtons = [
    {
        id: "btn_add1",
        label: "Agregar cliente",
        icon: "pi pi-fw pi-plus",
        onClick: () => {
            console.log("FUNCIONA BOTON 1");
        }
    }
];

/* Componente Principal */
function Clients({sessionToken, setSessionToken, searchValue, setSearchValue, isAdminWorker, setIsAdminWorker}){

    // Estados
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState(0);

    const [clients, setClients] = useState([]);

    const [clientToEdit, setClientToEdit] = useState(null);
    const [clientToCreate, setClientToCreate] = useState(null);
    const [clientToView, setClientToView] = useState(null);

    // Navigation
    const navigate = useNavigate();

    // Referencias
    const messagesQueue = useRef(null);

    // Variables necesarias
    const sessionEstablished = checkSessionToken(sessionToken);

    const handleSaveClient = (editedClient) => {
        /* setWorkers(workers.map(worker =>
            worker.idPersonal === editedWorker.idPersonal ? editedWorker : worker
        ));
        setWorkerToEdit(null); */
        
        // Actualizamos el cliente en el back
        // Función en caso de que la petición sea correcta
        const onClientUpdateSuccess = (data) => {
            /* console.log("ÉXITO");
            console.log(data); */

            console.log(clients);
            console.log(editedClient);

            // Actualizamos la lista de clientes y mostramos un mensaje de éxito
            setClients(clients.map(client => {
                console.log(client);
                console.log(client.idCliente === editedClient.idCliente);
                console.log(client.idCliente === editedClient.idCliente ? editedClient : client);
                return client.idCliente === editedClient.idCliente ? editedClient : client;
            }));
            setClientToEdit(null);

            window.location.reload();

            messagesQueue.current.show([
                { severity: "success", summary: "Modificación de cliente", detail: "Cliente modificado con éxito", sticky: true }
            ])
        }

        // Función en caso de que la petición sea erronea
        const onClientUpdateError = (error) => {
            /* console.log("ERROR");
            console.log(error); */

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
                    { severity: "error", summary: "Error al editar al cliente", detail: `Hay errores en la inserción de los siguientes parámetros:${errorParams}`, sticky: true }
                ])
            }
            // Si tenemos un 401 (Unautorized) hay un error con la sesión, la cerramos
            else if (error.response.status === 401){
                closeSession(setSessionToken, setIsAdminWorker);
            }
            // Sino, mostramos que ha ocurrido un error desconocido
            else{
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al editar al cliente", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                ])
            }
        }

        // Lanzamos la petición
        editClientsRequest(process.env.REACT_APP_BACK_ROUTE_UPDATE_CLIENTS, editedClient, sessionToken, onClientUpdateSuccess, onClientUpdateError);

    }

    // Función para añadir un nuevo cliente
    const handleCreateClient = (newClient) => {
        
        console.log(newClient);

        // Función en caso de que la consulta sea exitosa
        const onClientCreateSuccess = (data) => {
            /* console.log("ÉXITO");
            console.log(data); */
            /* messagesQueue.current.show([
                { severity: "success", summary: "Creación de usuario", detail: "Usuario creado con éxito", sticky: true }
            ]) */

            // Recargamos la página 
            window.location.reload();
        }

        // Función en caso de que la consulta sea erronea
        const onClientCreateError = (error) => {
            /* console.log("ERROR");
            console.log(error); */

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
                    { severity: "error", summary: "Error al agregar al cliente", detail: `Hay errores en la inserción de los siguientes parámetros:${errorParams}`, sticky: true }
                ])
            }
            // Sino, mostramos que ha ocurrido un error desconocido
            else{
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al agregar al cliente", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                ])
            }
        }

        createClientsRequest(process.env.REACT_APP_BACK_ROUTE_CREATE_CLIENTS, newClient, sessionToken, onClientCreateSuccess, onClientCreateError);

    };


    // Creamos el event handler del onclick del botón de agregar
    addButtons[0].onClick = () => {
        const newClient = {
            idCliente: clients.length + 1,
            Nombre: "",
            Apellidos: "",
            TipoCliente: "",
            NIF_CIF: "",
            DireccionCliente: "",
            Telefono: '',
            DireccionEntrega: "",
            DescuentoVolumen: 0
        };
    
        setClientToCreate(newClient);
    }
    
    // Comprobamos que la sesión esté iniciada
    useEffect(() => {
        if(!sessionEstablished){
            navigate(process.env.REACT_APP_ROUTE_LOGIN + "?referrer=" + process.env.REACT_APP_ROUTE_CLIENTS)
        }
    }, [sessionToken]);

    // Obtenemos la lista de clientes del backend
    // Función en caso de que la petición vaya bien
    const onClientsGetSuccess = (data) => {
        /* console.log("ÉXITO");
        console.log(data); */
        setClients(data.data.map((obtainedClient) => {
            var newClient = obtainedClient;
            newClient["NombreCompleto"] = `${obtainedClient.Nombre} ${obtainedClient.Apellidos}`;
            newClient.CodigoEmpresa = "";
            return newClient;
        }));
    }

    // Función en caso de que la petición vaya mal
    const onClientsGetError = (error) => {
        /* console.log("ERROR");
        console.log(error); */

        // Si el código de respuesta es 401 (Unauthorized) la sesión es erronea, por lo que cerramos la sesión y redirigimos al login
        if(error.response.status === 401){
            closeSession(setSessionToken, isAdminWorker);
        }
        // Sino, mostramos que ha ocurrido un error
        else{
            messagesQueue.current.show([
                { severity: "error", summary: "Error al obtener la lista de clientes", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
            ])
        }
    }

    // Lanzamos la petición
    useEffect(() => {
        getClientsRequest(process.env.REACT_APP_BACK_ROUTE_GET_CLIENTS, sessionToken, onClientsGetSuccess, onClientsGetError);
    }, []);

    // Retornamos el código HTML
    return(
        <>
            {   sessionEstablished &&
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
                        <h1>Clientes</h1>
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
                            <ClientsList 
                                clients={clients} 
                                setClients={setClients} 
                                setClientToEdit={setClientToEdit}
                                setClientToView={setClientToView}
                                sortField={sortField} 
                                sortOrder={sortOrder} 
                                searchValue={searchValue}
                                sessionToken={sessionToken}
                                setSessionToken={setSessionToken}
                                isAdminWorker={isAdminWorker}
                                messagesQueue={messagesQueue}
                            />
                        </div>
                    </div>
                </div>
            }
            {
                clientToEdit && 
                <EditarCliente cliente={clientToEdit} visible={Boolean(clientToEdit)} onHideDialog={() => setClientToEdit(null)} onSaveCliente={handleSaveClient} />
            }
            {
                clientToCreate &&
                <EditarCliente cliente={clientToCreate} visible={Boolean(clientToCreate)} onHideDialog={() => setClientToCreate(null)} onSaveCliente={handleCreateClient} />
            }
            {
                clientToView &&
                <VerCliente cliente={clientToView} visible={Boolean(clientToView)} onHideDialog={() => setClientToView(null)} />
            }
        </>
    );

}

export default Clients;