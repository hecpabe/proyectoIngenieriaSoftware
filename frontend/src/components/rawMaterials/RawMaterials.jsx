

/*
    Título: Raw Materials
    Descripción: Componente con el que gestionamos la vista de las materias primas
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
import RawMaterialsList from "./RawMaterialsList";
import EditarMateriaPrima from "../edit/EditarMateriaPrima";
import VerMateriaPrima from "../edit/VerMateriaPrima";

// Utilidades propias
import { checkSessionToken, closeSession } from "../../util/SessionUtils";
import { getRawMaterialsRequest, createRawMaterialsRequest, editRawMaterialsRequest } from "../../util/APIRawMaterialsUtils";

// Declaraciones constantes
const filterButtons = [
    {
        id: "btn_filter_name",
        label: "Nombre",
        icon: "pi pi-fw pi-filter",
        fieldName: "nombreMateriaPrima",
        order: "none"
    },
    {
        id: "btn_filter_date",
        label: "Fecha",
        icon: "pi pi-fw pi-filter",
        fieldName: "Fecha",
        order: "none"
    },
    {
        id: "btn_filter_grape_type",
        label: "Tipo de uva",
        icon: "pi pi-fw pi-filter",
        fieldName: "TipoUva",
        order: "none"
    },
    {
        id: "btn_filter_rating",
        label: "Valoración",
        icon: "pi pi-fw pi-filter",
        fieldName: "Valoracion",
        order: "none"
    }
];

const addButtons = [
    {
        id: "btn_add1",
        label: "Agregar materia prima",
        icon: "pi pi-fw pi-plus",
        onClick: () => {
            console.log("FUNCIONA BOTON 1");
        }
    }
];

/* Componente Principal */
function RawMaterials({sessionToken, setSessionToken, searchValue, setSearchValue, isAdminWorker, setIsAdminWorker}){

    // Estados
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState(0);

    const [rawMaterials, setRawMaterials] = useState([]);

    const [rawMaterialToEdit, setRawMaterialToEdit] = useState(null);
    const [rawMaterialToCreate, setRawMaterialToCreate] = useState(null);
    const [rawMaterialToView, setRawMaterialToView] = useState(null);

    // Navigation
    const navigate = useNavigate();

    // Referencias
    const messagesQueue = useRef(null);

    // Variables necesarias
    const sessionEstablished = checkSessionToken(sessionToken);

    // Event handler para la creación de materias primas
    const handleCreateRawMaterial = (newRawMaterial) => {
        
        // Función en caso de que la consulta sea correcta
        const onCreateRawMaterialSuccess = (data) => {
            // Recargamos la página para que se vuelvan a pedir los datos al back
            window.location.reload();
        }

        // Función en caso de que la consulta sea erronea
        const onCreateRawMaterialError = (error) => {
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
                    { severity: "error", summary: "Error al agregar la materia prima", detail: `Hay errores en la inserción de los siguientes parámetros:${errorParams}`, sticky: true }
                ])
            }
            // Si el código de respuesta es 401 (Unauthorized) hay un error en la sesión, por lo que cerramos la sesión
            else if(error.response.status === 401){
                closeSession(setSessionToken, setIsAdminWorker);
            }
            // Sino, mostramos que ha ocurrido un error desconocido
            else{
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al agregar la materia prima", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                ])
            }
        }

        // Si la valoración de la uva es menor que 2 mostramos una alerta, en caso contrario registramos la uva
        if(newRawMaterial.Valoracion < 2){
            messagesQueue.current.show([
                { severity: "error", summary: "Error al agregar la materia prima", detail: "La uva no puede ser registrada ya que tiene una valoración inferior a 2 estrellas", sticky: true }
            ])
        }
        else{
            createRawMaterialsRequest(process.env.REACT_APP_BACK_ROUTE_CREATE_RAW_MATERIALS, newRawMaterial, sessionToken, onCreateRawMaterialSuccess, onCreateRawMaterialError);
        }

    }

    // Event handler para la edición de materias primas
    const handleEditRawMaterial = (editedRawMaterial) => {
        
        // Función en caso de que la consulta sea correcta
        const onEditRawMaterialSuccess = (data) => {
            // Actualizamos la lista de empleados y mostramos un mensaje de éxito
            setRawMaterials(rawMaterials.map(rawMaterial =>
                rawMaterial.idMateriaPrrima === editedRawMaterial.idMateriaPrrima ? editedRawMaterial : rawMaterial
            ));
            setRawMaterialToEdit(null);

            messagesQueue.current.show([
                { severity: "success", summary: "Modificación de materia prima", detail: "Materia prima modificada con éxito", sticky: true }
            ])
        }

        // Función en caso de que la consulta sea erronea
        const onEditRawMaterialError = (error) => {
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
                    { severity: "error", summary: "Error al editar la materia prima", detail: `Hay errores en la inserción de los siguientes parámetros:${errorParams}`, sticky: true }
                ])
            }
            // Si tenemos un 401 (Unautorized) hay un error con la sesión, la cerramos
            else if (error.response.status === 401){
                closeSession(setSessionToken, setIsAdminWorker);
            }
            // Sino, mostramos que ha ocurrido un error desconocido
            else{
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al editar la materia prima", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                ])
            }
        }

        // Si la valoración de la uva es menor a 2 mostramos error, sino realizamos la petición
        if(editedRawMaterial.Valoracion < 2){
            messagesQueue.current.show([
                { severity: "error", summary: "Error al editar la materia prima", detail: "La uva no puede ser modificada ya que tiene una nueva valoración inferior a 2 estrellas", sticky: true }
            ])
        }
        else{
            editRawMaterialsRequest(process.env.REACT_APP_BACK_ROUTE_UPDATE_RAW_MATERIALS, editedRawMaterial, sessionToken, onEditRawMaterialSuccess, onEditRawMaterialError);
        }

    }

    // Creamos el event handler del onclick del botón de agregar
    addButtons[0].onClick = () => {
        const newRawMaterial = {
            idMateriaPrrima: rawMaterials.length + 1,
            nombreMateriaPrima: '',
            Fecha: '',
            Cantidad: 0,
            CodigoVinia: 0,
            DescripcionMateriaPrima: '',
            TipoUva: '',
            GradoMadurez: 0,
            Valoracion: 0
        };
    
            setRawMaterialToCreate(newRawMaterial);
    };

    // Comprobamos que la sesión esté iniciada
    useEffect(() => {
        if(!sessionEstablished){
            navigate(process.env.REACT_APP_ROUTE_LOGIN + "?referrer=" + process.env.REACT_APP_ROUTE_RAW_MATERIALS)
        }
    }, [sessionToken]);

    // Obtenemos la lista de trabajadores del backend
    // Función en caso de que la petición sea correcta
    const onRawMaterialsGetSuccess = (data) => {
        /* console.log("ÉXITO");
        console.log(data); */

        setRawMaterials(data.data);
    }

    // Función en caso de que la petición sea erronea
    const onRawMaterialsGetError = (error) => {
        console.log("ERROR");
        console.log(error);

        // Si el código de error es 401 (Unauthorized) hay un error en la sesión, por lo que se cierra
        if(error.response.status === 401){
            closeSession(setSessionToken, setIsAdminWorker);
        }
        // Sino, mostramos que ha ocurrido un error
        else{
            messagesQueue.current.show([
                { severity: "error", summary: "Error al obtener la lista de materias primas", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
            ])
        }
    }

    // Lanzamos la petición
    useEffect(() => {
        getRawMaterialsRequest(process.env.REACT_APP_BACK_ROUTE_GET_RAW_MATERIALS, sessionToken, onRawMaterialsGetSuccess, onRawMaterialsGetError);
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
                        <h1>Materias primas</h1>
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
                            <RawMaterialsList 
                                rawMaterials={rawMaterials} 
                                setRawMaterials={setRawMaterials} 
                                setRawMaterialToEdit={setRawMaterialToEdit}
                                setRawMaterialToView={setRawMaterialToView}
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
                rawMaterialToView &&
                <VerMateriaPrima materiaPrima={rawMaterialToView} visible={Boolean(rawMaterialToView)} onHideDialog={() => setRawMaterialToView(null)} />
            }
            {
                rawMaterialToCreate &&
                <EditarMateriaPrima materiaPrima={rawMaterialToCreate} visible={Boolean(rawMaterialToCreate)} onHideDialog={() => setRawMaterialToCreate(null)} onSaveMateriaPrima={handleCreateRawMaterial} />
            }
            {
                rawMaterialToEdit &&
                <EditarMateriaPrima materiaPrima={rawMaterialToEdit} visible={Boolean(rawMaterialToEdit)} onHideDialog={() => setRawMaterialToEdit(null)} onSaveMateriaPrima={handleEditRawMaterial} />
            }
        </>
    );

}

export default RawMaterials;