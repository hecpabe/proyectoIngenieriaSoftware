

/*
    Título: Raw Materials List
    Descripción: Componente con el que gestionamos la lista de materias primas
    Fecha: 06/01/2024
    Última Modificación: 06/01/2024
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
import React from "react";

// Primereact
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Rating } from "primereact/rating";
import { confirmDialog } from "primereact/confirmdialog";

// Utilidades propias
import { closeSession } from "../../util/SessionUtils";
import { deleteRawMaterialRequest } from "../../util/APIRawMaterialsUtils";

/* Componente Principal */
function RawMaterialsList({rawMaterials, setRawMaterials, setRawMaterialToEdit, setRawMaterialToView, sortField, sortOrder, searchValue, sessionToken, setSessionToken, setIsAdminWorker, messagesQueue}){

    // Filtramos las materias primas en función el search value
    const filteredRawMaterials = rawMaterials.filter(rawMaterial => 
        searchValue === "" ||
        rawMaterial.nombreMateriaPrima.toLowerCase().includes(searchValue.toLowerCase()) ||
        rawMaterial.TipoUva.toLowerCase().includes(searchValue.toLowerCase()) ||
        rawMaterial.DescripcionMateriaPrima.toLowerCase().includes(searchValue.toLowerCase()) ||
        rawMaterial.Fecha.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Plantilla de elemento de la lista de materias primas
    const rawMaterialsTemplate = (rawMaterial) => {
        return(
            <>
                <div className="col-12">
                    <div className="flex">
                        <div className="col-8">
                            <div className="flex">
                                <div className="flex align-items-center mr-4">
                                    <Image src={process.env.REACT_APP_GRAPE_LOGO + "?a=1"} alt="Image" width="150" />
                                </div>
                                <div>
                                    <h3>{rawMaterial.nombreMateriaPrima}</h3>
                                    <p>Descripción: {rawMaterial.DescripcionMateriaPrima}</p>
                                    <p>Tipo de uva: {rawMaterial.TipoUva}</p>
                                    <p>Fecha: {rawMaterial.Fecha}</p>
                                    <div className="flex">
                                        <div className="flex justify-content-center">
                                            <p className="mr-2">Valoración:</p>
                                            <Rating readOnly cancel={false} value={rawMaterial.Valoracion} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 flex justify-content-end">
                            <div>
                                <Button icon="pi pi-fw pi-eye" severity="info" className="mr-2" onClick={
                                    () => {
                                        setRawMaterialToView(rawMaterial);
                                    }
                                } />
                                <Button icon="pi pi-fw pi-pencil" severity="help" className="mr-2" onClick={
                                    () => {
                                        setRawMaterialToEdit(rawMaterial);
                                    }
                                } />
                                <Button icon="pi pi-fw pi-times-circle" severity="danger" onClick={
                                    () => {
                                        confirmDialog({
                                            message: '¿Desea eliminar la materia prima del sistema?',
                                            header: 'Confirmación de eliminación',
                                            icon: 'pi pi-info-circle',
                                            acceptClassName: 'p-button-danger',
                                            acceptLabel: 'Sí',
                                            rejectLabel: 'No',
                                            accept: () => {
                                                // Función callback en caso de que la petición sea correcta
                                                const onDeleteRawMaterialSuccess = (data) => {
                                                    // Sacamos la materia prima de la lista
                                                    const newRawMaterials = rawMaterials.filter(currentRawMaterial => currentRawMaterial.idMateriaPrrima != rawMaterial.idMateriaPrrima);
                                                    setRawMaterials(newRawMaterials);
                                                    messagesQueue.current.show([
                                                        { severity: "success", summary: "Materia prima eliminada", detail: "La materia prima ha sido eliminada con éxito", sticky: true }
                                                    ])
                                                }
                                                
                                                // Función callback en caso de que la petición sea erronea
                                                const onDeleteRawMaterialError = (error) => {
                                                    // Si el error es un 401 (Unauthorized) hay un error con la sesión, por lo que la cerramos
                                                    if(error.response.status === 401){
                                                        closeSession(setSessionToken, setIsAdminWorker);
                                                    }
                                                    // Sino, mostramos que ha ocurrido un error
                                                    else{
                                                        messagesQueue.current.show([
                                                            { severity: "error", summary: "Error al eliminar la materia prima", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                                                        ])
                                                    }
                                                }

                                                // Lanzamos la petición
                                                deleteRawMaterialRequest(process.env.REACT_APP_BACK_ROUTE_DELETE_RAW_MATERIALS, rawMaterial.idMateriaPrrima, sessionToken, onDeleteRawMaterialSuccess, onDeleteRawMaterialError);
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
                <DataView value={filteredRawMaterials} itemTemplate={rawMaterialsTemplate} sortField={sortField} sortOrder={sortOrder} />
            </div>
        </>
    );

}

export default RawMaterialsList;