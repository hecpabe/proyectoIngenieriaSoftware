import React, { useState,useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import './components.css'

const VerEmpleado = ({ empleado, visible, onHideDialog }) => {
    const categoriasLaborales = ['Personal', 'Administrativo'];
    const estadosCiviles = ['Soltero', 'Casado'];

    const [empleadoEditado, setEmpleadoEditado] = useState({ ...empleado });

    // Actualiza el estado local cuando cambian las props
    useEffect(() => {
      setEmpleadoEditado({ ...empleado });
    }, [empleado]);
    
    const footerContent = (
        <div>
            <Button label="Cerrar vista" icon="pi pi-times" onClick={onHideDialog} className="p-button-text" />
        </div>
    );

    return (
        <Dialog header="Ver Empleado" visible={visible} onHide={onHideDialog}  footer={footerContent} headerStyle={{ textAlign: 'center' }} >

        <div className="container p-fluid">

            <div className="column">
                {/* NIF */}
                <div className="p-field">
                <label htmlFor="nif">NIF</label>
                <InputText id="nif" value={empleadoEditado.NIF|| ""} disabled />
                </div>

                {/* Nombre */}
                <div className="p-field">
                <label htmlFor="nombre">Nombre</label>
                <InputText id="nombre" value={empleadoEditado.Nombre|| ""} disabled />
                </div>

                {/* Apellidos */}
                <div className="p-field">
                <label htmlFor="apellidos">Apellidos</label>
                <InputText id="apellidos" value={empleadoEditado.Apellidos || ""} disabled />
                </div>

                {/* Fecha de Nacimiento */}
                <div className="p-field">
                <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                
                {
                  empleadoEditado.FechaNacimiento ?
                  <Calendar value={new Date(empleadoEditado.FechaNacimiento)} disabled showIcon /> :
                  <Calendar disabled showIcon />
                }
                </div>

                {/* Domicilio */}
                <div className="p-field">
                <label htmlFor="domicilio">Domicilio</label>
                <InputText id="domicilio" value={empleadoEditado.Domicilio|| ""} disabled />
                </div>

                {/* Teléfono */}
                <div className="p-field">
                <label htmlFor="telefono">Teléfono</label>
                <InputText id="telefono" value={empleadoEditado.Telefono|| ""} disabled />
                </div>
            
            </div>
            

            {/*------------------------*/}


            <div className="column">

                {/* Categoría Laboral */}
                <div className="p-field">
                <label htmlFor="categoriaLaboral">Categoría Laboral</label>
                <Dropdown id="categoriaLaboral" value={empleadoEditado.CategoriaLaboral} options={categoriasLaborales} disabled />
                </div>

                {/* Fecha de Ingreso */}
                <div className="p-field">
                <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
                {
                  empleadoEditado.FechaIngreso ?
                  <Calendar id="fechaIngreso" value={new Date(empleadoEditado.FechaIngreso)} disabled showIcon /> :
                  <Calendar id="fechaIngreso" disabled showIcon />
                }
                </div>

                {/* Número de Hijos */}
                <div className="p-field">
                <label htmlFor="numHijos">Número de Hijos</label>
                <InputNumber id="numHijos" value={empleadoEditado.NumHijos|| 0} disabled />
                </div>

                {/* Estado Civil */}
                <div className="p-field">
                <label htmlFor="estadoCivil">Estado Civil</label>
                <Dropdown id="estadoCivil" value={empleadoEditado.EstadoCivil} options={estadosCiviles} disabled />
                </div>

                {/* Contacto de Emergencia */}
                <div className="p-field">
                <label htmlFor="contactoEmergencia">Contacto de Emergencia</label>
                <InputText id="contactoEmergencia" value={empleadoEditado.ContactoEmergencia|| ""} disabled />
                </div>

                {/* IBAN */}
                <div className="p-field">
                <label htmlFor="iban">IBAN</label>
                <InputText id="iban" value={empleadoEditado.IBAN|| ""} disabled />
                </div>

            </div>

        </div>

        </Dialog>
    );
};

export default VerEmpleado;
