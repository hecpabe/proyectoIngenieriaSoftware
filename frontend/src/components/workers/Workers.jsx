

/*
    Título: Workers
    Descripción: Componente principal de la página de personal
    Fecha: 13/12/2023
    Última Modificación: 14/12/2023
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
import WorkersList from "./WorkersList";
import EditarEmpleado from "../edit/EditarEmpleado";
import VerEmpleado from "../edit/VerEmpleado";

// Utilidades propias
import { checkSessionToken, closeSession } from "../../util/SessionUtils";
import { addWorkerRequest, getWorkersRequest, updateWorkerRequest } from "../../util/APIWorkersUtils";

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
        id: "btn_filter_position",
        label: "Categoría laboral",
        icon: "pi pi-fw pi-filter",
        fieldName: "CategoriaLaboral",
        order: "none"
    },
    {
        id: "btn_filter_nif",
        label: "NIF",
        icon: "pi pi-fw pi-filter",
        fieldName: "NIF",
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
        label: "Agregar empleado",
        icon: "pi pi-fw pi-plus",
        onClick: () => {
            console.log("FUNCIONA BOTON 1");
        }
    }
];

/* Componente Principal */
function Workers({sessionToken, setSessionToken, searchValue, setSearchValue, isAdminWorker, setIsAdminWorker}){

    // Estados
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState(0);

    const [workers, setWorkers] = useState([]);

    // Estados
    const [workerToEdit, setWorkerToEdit] = useState(null);
    const [workerToCreate, setWorkerToCreate] = useState(null);
    const [workerToView, setWorkerToView] = useState(null);

    // Navigation
    const navigate = useNavigate();

    // Referencias
    const messagesQueue = useRef(null);

    // Variables necesarias
    const sessionEstablished = checkSessionToken(sessionToken);

    // FUNCIONES
    const handleSaveWorker = (editedWorker) => {
        /* setWorkers(workers.map(worker =>
            worker.idPersonal === editedWorker.idPersonal ? editedWorker : worker
        ));
        setWorkerToEdit(null); */
        
        // Actualizamos el empleado en el back
        // Función en caso de que la petición sea correcta
        const onWorkerUpdateSuccess = (data) => {
            /* console.log("ÉXITO");
            console.log(data); */

            // Le quitamos el código de empresa
            var formattedWorker = editedWorker;
            formattedWorker.CodigoEmpresa = '';

            // Actualizamos la lista de empleados y mostramos un mensaje de éxito
            setWorkers(workers.map(worker =>
                worker.idPersonal === formattedWorker.idPersonal ? formattedWorker : worker
            ));
            setWorkerToEdit(null);

            messagesQueue.current.show([
                { severity: "success", summary: "Modificación de usuario", detail: "Usuario modificado con éxito", sticky: true }
            ])
        }

        // Función en caso de que la petición sea erronea
        const onWorkerUpdateError = (error) => {
            /* console.log("ERROR");
            console.log(error); */

            // Variables necesarias
            const errorData = error.response.data;

            // Si el dato es un string y este muestra ERROR_REGISTER el usuario está repetido
            if(typeof errorData === "string" && errorData === "ERROR_REGISTER"){
                // Mostramos el mensaje de error
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al editar al trabajador", detail: "El trabajador que está intentando editar contiene campos repetidos (NIF o Código de la empresa)", sticky: true }
                ])
            }
            // Si el dato es un objeto, hay errores en la inserción de datos
            else if(typeof errorData === "object"){
                // Mostramos el mensaje de error
                var errorParams = "";
                errorData.errors.map((errorParam) => {
                    if(!errorParams.includes(errorParam.param))
                        errorParams += ("\n" + errorParam.param);
                    return;
                });
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al editar al trabajador", detail: `Hay errores en la inserción de los siguientes parámetros:${errorParams}`, sticky: true }
                ])
            }
            // Si tenemos un 401 (Unautorized) hay un error con la sesión, la cerramos
            else if (error.response.status === 401){
                closeSession(setSessionToken, setIsAdminWorker);
            }
            // Sino, mostramos que ha ocurrido un error desconocido
            else{
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al editar al trabajador", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                ])
            }
        }

        // Lanzamos la petición
        updateWorkerRequest(process.env.REACT_APP_BACK_ROUTE_UPDATE_WORKER, editedWorker, sessionToken, onWorkerUpdateSuccess, onWorkerUpdateError);

    }

    // Función para añadir un nuevo empleado
    const handleCreateWorker = (newWorker) => {
        
        // Función en caso de que la consulta sea exitosa
        const onWorkerCreateSuccess = (data) => {
            /* console.log("ÉXITO");
            console.log(data); */
            /* messagesQueue.current.show([
                { severity: "success", summary: "Creación de usuario", detail: "Usuario creado con éxito", sticky: true }
            ]) */

            // Recargamos la página 
            window.location.reload();
        }

        // Función en caso de que la consulta sea erronea
        const onWorkerCreateError = (error) => {
            /* console.log("ERROR");
            console.log(error); */

            // Variables necesarias
            const errorData = error.response.data;

            // Si el dato es un string y este muestra ERROR_REGISTER el usuario está repetido
            if(typeof errorData === "string" && errorData === "ERROR_REGISTER"){
                // Mostramos el mensaje de error
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al agregar al trabajador", detail: "El trabajador que está intentando crear está repetido (NIF o Código de la empresa)", sticky: true }
                ])
            }
            // Si el dato es un objeto, hay errores en la inserción de datos
            else if(typeof errorData === "object"){
                // Mostramos el mensaje de error
                var errorParams = "";
                errorData.errors.map((errorParam) => {
                    if(!errorParams.includes(errorParam.param))
                        errorParams += ("\n" + errorParam.param);
                    return;
                });
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al agregar al trabajador", detail: `Hay errores en la inserción de los siguientes parámetros:${errorParams}`, sticky: true }
                ])
            }
            // Sino, mostramos que ha ocurrido un error desconocido
            else{
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al agregar al trabajador", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                ])
            }
        }

        addWorkerRequest(process.env.REACT_APP_BACK_ROUTE_REGISTER, newWorker, onWorkerCreateSuccess, onWorkerCreateError);

    };

    // Creamos el event handler del onclick del botón de agregar
    addButtons[0].onClick = () => {
        const newWorker = {
            idPersonal: workers.length + 1,
            NIF: '',
            Nombre: '',
            Apellidos: '',
            FechaNacimiento: '',
            Domicilio: '',
            Telefono: null,
            ContactoEmergencia: null,
            CategoriaLaboral: '',
            FechaIngreso: '',
            NumHijos: 0,
            EstadoCivil: '',
            IBAN: '',
            CodigoEmpresa: ''
            };
    
            setWorkerToCreate(newWorker);
    }

    // Comprobamos que la sesión esté iniciada y el usuario tenga autorización para verlo
    useEffect(() => {
        if(!sessionEstablished){
            navigate(process.env.REACT_APP_ROUTE_LOGIN + "?referrer=" + process.env.REACT_APP_ROUTE_WORKERS)
        }
        else if(!isAdminWorker){
            navigate(process.env.REACT_APP_ROUTE_HOME)
        }
    }, [sessionToken, isAdminWorker]);

    // Obtenemos la lista de trabajadores del backend
    // Función en caso de que la petición vaya bien
    const onWorkersGetSuccess = (data) => {
        /* console.log("ÉXITO");
        console.log(data); */
        setWorkers(data.data.map((obtainedWorker) => {
            var newWorker = obtainedWorker;
            newWorker["NombreCompleto"] = `${obtainedWorker.Nombre} ${obtainedWorker.Apellidos}`;
            newWorker.CodigoEmpresa = "";
            return newWorker;
        }).filter(workerToFilter => !workerToFilter.Borrado));
    }

    // Función en caso de que la petición vaya mal
    const onWorkersGetError = (error) => {
        /* console.log("ERROR");
        console.log(error); */

        // Si el código de respuesta es 401 (Unauthorized) la sesión es erronea, por lo que cerramos la sesión y redirigimos al login
        if(error.response.status === 401 || !isAdminWorker){
            closeSession(setSessionToken, setIsAdminWorker);
        }
        // Sino, mostramos que ha ocurrido un error
        else{
            messagesQueue.current.show([
                { severity: "error", summary: "Error al obtener la lista de trabajadores", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
            ])
        }
    }

    // Lanzamos la petición
    useEffect(() => {
        getWorkersRequest(process.env.REACT_APP_BACK_ROUTE_GET_WORKERS, sessionToken, onWorkersGetSuccess, onWorkersGetError);
    }, []);

    // Retornamos el código HTML
    return(
        <>
            {   sessionEstablished && isAdminWorker &&
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
                        <h1>Personal</h1>
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
                            <WorkersList 
                                workers={workers} 
                                setWorkers={setWorkers} 
                                setWorkerToEdit={setWorkerToEdit}
                                setWorkerToView={setWorkerToView}
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
                workerToEdit && 
                <EditarEmpleado empleado={workerToEdit} visible={Boolean(workerToEdit)} onHideDialog={() => setWorkerToEdit(null)} onSaveEmpleado={handleSaveWorker} />
            }
            {
                workerToCreate &&
                <EditarEmpleado empleado={workerToCreate} visible={Boolean(workerToCreate)} onHideDialog={() => setWorkerToCreate(null)} onSaveEmpleado={handleCreateWorker} />
            }
            {
                workerToView &&
                <VerEmpleado empleado={workerToView} visible={Boolean(workerToView)} onHideDialog={() => setWorkerToView(null)} />
            }
        </>
    );

}

export default Workers;