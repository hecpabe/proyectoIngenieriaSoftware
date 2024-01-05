

/*
    Título: Workers
    Descripción: Componente principal de la página de personal
    Fecha: 13/12/2023
    Última Modificación: 14/12/2023
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Prime react
import { ConfirmDialog } from "primereact/confirmdialog";

// Bibliotecas de componentes propios
import Navbar from "../common/Navbar";
import ListToolbar from "../common/ListToolbar";
import WorkersList from "./WorkersList";
import EditarEmpleado from "../edit/EditarEmpleado";

// Utilidades propias
import { checkSessionToken } from "../../util/SessionUtils";

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

// TODO: Redirigir a la creación de usuarios al darle click al botón de agregar
const addButtons = [
    {
        id: "btn_add1",
        label: "Agregar empleado",
        icon: "pi pi-fw pi-plus",
        onClick: () => {
            console.log("FUNCIONA BOTON 1");
        }
    }
]

const workers_TEMP = [
    {
        idPersonal: 1,
        NIF: '12345678A',
        Nombre: 'Juan',
        Apellidos: 'Pérez García',
        FechaNacimiento: '1980-01-01',
        Domicilio: 'Calle Falsa 123, Ciudad Falsa',
        Telefono: 123456789,
        ContactoEmergencia: 987654321,
        CategoriaLaboral: 'Administrativo',
        FechaIngreso: '2010-05-15',
        NumHijos: 2,
        EstadoCivil: 'Casado',
        IBAN: 'ES1234567890123456789012'
      },
      {
        idPersonal: 2,
        NIF: '23456789B',
        Nombre: 'Ana',
        Apellidos: 'Gómez Martínez',
        FechaNacimiento: '1985-04-10',
        Domicilio: 'Avenida Principal 456, Ciudad Real',
        Telefono: 234567890,
        ContactoEmergencia: 987654321,
        CategoriaLaboral: 'Personal',
        FechaIngreso: '2012-07-20',
        NumHijos: 0,
        EstadoCivil: 'Soltero',
        IBAN: 'ES2345678901234567890123'
      },
      {
        idPersonal: 3,
        NIF: '34567890C',
        Nombre: 'Carlos',
        Apellidos: 'López Fernández',
        FechaNacimiento: '1990-11-30',
        Domicilio: 'Plaza Central 789, Ciudad Nueva',
        Telefono: 345678901,
        ContactoEmergencia: 987654321,
        CategoriaLaboral: 'Personal',
        FechaIngreso: '2015-03-01',
        NumHijos: 1,
        EstadoCivil: 'Casado',
        IBAN: 'ES3456789012345678901234'
      }
];

/* Componente Principal */
function Workers({sessionToken, setSessionToken, searchValue, setSearchValue}){

    // Estados
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState(0);

    const [workers, setWorkers] = useState(workers_TEMP);

    // Estados
    const [workerToEdit, setWorkerToEdit] = useState(null);
    const [workerToCreate, setWorkerToCreate] = useState(null);

    // Navigation
    const navigate = useNavigate();

    // Variables necesarias
    const sessionEstablished = checkSessionToken(sessionToken);

    // FUNCIONES
    const handleSaveWorker = (editedWorker) => {
        setWorkers(workers.map(worker =>
            worker.idPersonal === editedWorker.idPersonal ? editedWorker : worker
        ));
        setWorkerToEdit(null);
    }

    // Función para añadir un nuevo empleado
    const handleCreateWorker = (newWorker) => {
        
        // TODO: Mandar el nuevo usuario al backend

        // TODO: Cambiar el agregarlo a la lista por refrescar la página o volver a pedir los datos al back
        setWorkers([...workers, newWorker]);

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
            NumHijos: null,
            EstadoCivil: '',
            IBAN: ''
            };
    
            setWorkerToCreate(newWorker);
    }

    // TODO: Obtener si el usuario es admin o no
    const userIsAdmin = true;

    // Comprobamos que la sesión esté iniciada y el usuario tenga autorización para verlo
    useEffect(() => {
        if(!sessionEstablished){
            navigate(process.env.REACT_APP_ROUTE_LOGIN + "?referrer=" + process.env.REACT_APP_ROUTE_WORKERS)
        }
        if(!userIsAdmin){
            navigate(process.env.REACT_APP_ROUTE_HOME)
        }
    }, [sessionToken, userIsAdmin]);

    // TODO: Obtenemos la lista de trabajadores del backend

    // Agregamos el nombre completo
    // TODO: Esto de aquí mantiene la página recargándose en bucle, buscar otra solución o hacer que el back devuelva
    /* useEffect(() => {
        setWorkers(workers.map(worker => {
            const newWorker = worker;
            newWorker["NombreCompleto"] = worker.Nombre + " " + worker.Apellidos;
            return newWorker;
        }));
    }, [workers]); */

    // Retornamos el código HTML
    return(
        <>
            {   sessionEstablished &&
                <div>
                    <ConfirmDialog />
                    <Navbar setSessionToken={setSessionToken} searchValue={searchValue} setSearchValue={setSearchValue} />
                    <div className="flex justify-content-center">
                        <h1>Personal</h1>
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
                                sortField={sortField} 
                                sortOrder={sortOrder} 
                                searchValue={searchValue}
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
        </>
    );

}

export default Workers;