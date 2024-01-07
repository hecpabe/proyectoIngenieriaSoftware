

/*
    Título: Workers List
    Descripción: Componente para la lista de personal
    Fecha: 13/12/2023
    Última Modificación: 14/12/2023
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
import { deleteWorkerRequest } from "../../util/APIWorkersUtils";

/* Componente Principal */
function WorkersList({workers, setWorkers, setWorkerToEdit, setWorkerToView, sortField, sortOrder, searchValue, sessionToken, setSessionToken, setIsAdminWorker, messagesQueue}){

    // Filtramos los trabajadores en función el search value
    const filteredWorkers = workers.filter(worker => 
        searchValue === "" ||
        worker.Nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
        worker.CategoriaLaboral.toLowerCase().includes(searchValue.toLowerCase()) ||
        worker.NIF.toLowerCase().includes(searchValue.toLowerCase()) ||
        worker.Telefono.toString().toLowerCase().includes(searchValue.toLowerCase())
    );

    // Recorremos a los trabajadores insertándoles sus iniciales
    for(let i = 0; i < filteredWorkers.length; i++){
        var label = "";
        (filteredWorkers[i].Nombre + filteredWorkers[i].Apellidos).split(" ").map((name) => {
            label += name.charAt(0);
        });
        filteredWorkers[i]["label"] = label;
    }

    // Plantilla de elemento de la lista de trabajadores
    const workersTemplate = (worker) => {
        return (
            <>
                <div className="col-12">
                    <div className="flex">
                        <div className="col-8">
                            <div className="flex">
                                <div className="flex align-items-center mr-4">
                                    <Avatar label={worker.label} size="xlarge" shape="circle" />
                                </div>
                                <div>
                                    <h3>{worker.Nombre} {worker.Apellidos}</h3>
                                    <p>Categoría laboral: {worker.CategoriaLaboral}</p>
                                    <p>NIF: {worker.NIF}</p>
                                    <p>Teléfono: {worker.Telefono}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 flex justify-content-end">
                            <div>
                                <Button icon="pi pi-fw pi-eye" severity="info" className="mr-2" onClick={
                                    () => {
                                        setWorkerToView(worker);
                                    }
                                } />
                                <Button icon="pi pi-fw pi-pencil" severity="help" className="mr-2" onClick={
                                    () => {
                                        setWorkerToEdit(worker);
                                    }
                                } />
                                <Button icon="pi pi-fw pi-times-circle" severity="danger" onClick={
                                    () => {
                                        confirmDialog({
                                            message: '¿Desea eliminar al trabajador del sistema?',
                                            header: 'Confirmación de eliminación',
                                            icon: 'pi pi-info-circle',
                                            acceptClassName: 'p-button-danger',
                                            acceptLabel: 'Sí',
                                            rejectLabel: 'No',
                                            accept: () => {
                                                // Función callback en caso de que la petición sea correcta
                                                const onDeleteWorkerSuccess = (data) => {
                                                    // Sacamos al empleado de la lista
                                                    const newWorkers = workers.filter(currentWorker => currentWorker.idPersonal != worker.idPersonal);
                                                    setWorkers(newWorkers);
                                                    messagesQueue.current.show([
                                                        { severity: "success", summary: "Trabajador eliminado", detail: "El trabajador ha sido eliminado con éxito", sticky: true }
                                                    ])
                                                }
                                                
                                                // Función callback en caso de que la petición sea erronea
                                                const onDeleteWorkerError = (error) => {
                                                    // Si el error es un 401 (Unauthorized) hay un error con la sesión, por lo que la cerramos
                                                    if(error.response.status === 401){
                                                        closeSession(setSessionToken, setIsAdminWorker);
                                                    }
                                                    // Sino, mostramos que ha ocurrido un error
                                                    else{
                                                        messagesQueue.current.show([
                                                            { severity: "error", summary: "Error al eliminar al trabajador", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                                                        ])
                                                    }
                                                }

                                                // Lanzamos la petición
                                                deleteWorkerRequest(process.env.REACT_APP_BACK_ROUTE_DELETE_WORKER, worker.idPersonal, sessionToken, onDeleteWorkerSuccess, onDeleteWorkerError);
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
                <DataView value={filteredWorkers} itemTemplate={workersTemplate} sortField={sortField} sortOrder={sortOrder} />
            </div>
        </>
    );

}

export default WorkersList;