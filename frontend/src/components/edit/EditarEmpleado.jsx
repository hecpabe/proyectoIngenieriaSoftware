import React, { useState,useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import './components.css'

const EditarEmpleado = ({ empleado, visible, onHideDialog,onSaveEmpleado }) => {
    const categoriasLaborales = ['Personal', 'Administrativo'];
    const estadosCiviles = ['Soltero', 'Casado'];

    const [empleadoEditado, setEmpleadoEditado] = useState({ ...empleado });

    // Actualiza el estado local cuando cambian las props
    useEffect(() => {
      setEmpleadoEditado({ ...empleado });
    }, [empleado]);
  
    const handleInputChange = (e, name) => {
      var value=null;
      if (name === 'NumHijos'){
        value = e.value;
      }else if(name==='FechaIngreso' || name==='FechaNacimiento'){
           
            const fecha = new Date(e.value);
            const year = fecha.getFullYear();
            const month = fecha.getMonth() + 1; 
            const day = fecha.getDate();

            // Aseguramos de que el día y el mes sean de dos dígitos
            const formattedMonth = month < 10 ? `0${month}` : month;
            const formattedDay = day < 10 ? `0${day}` : day;

            // Formatear la fecha como 'año/mes/día'
            value = `${year}/${formattedMonth}/${formattedDay}`;
      }else{
        value = e.target.value;
      }
      
      setEmpleadoEditado(prevEmpleado => ({
        ...prevEmpleado,
        [name]: value
      }));
    };
  
    const handleSave = () => {

  
      onSaveEmpleado(empleadoEditado);
      onHideDialog();
    };
    
    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={onHideDialog} className="p-button-text" />
            <Button label="Guardar" icon="pi pi-save"  onClick={handleSave} autoFocus />
        </div>
    );

    return (
        <Dialog header="Editar Empleado" visible={visible} onHide={onHideDialog}  footer={footerContent} headerStyle={{ textAlign: 'center' }} >

        <div className="container p-fluid">

            <div className="column">
                {/* NIF */}
                <div className="p-field">
                <label htmlFor="nif">NIF</label>
                <InputText id="nif" value={empleadoEditado.NIF|| ""} onChange={(e) => handleInputChange(e,'NIF')} />
                </div>

                {/* Nombre */}
                <div className="p-field">
                <label htmlFor="nombre">Nombre</label>
                <InputText id="nombre" value={empleadoEditado.Nombre|| ""} onChange={(e) => handleInputChange(e, 'Nombre')} />
                </div>

                {/* Apellidos */}
                <div className="p-field">
                <label htmlFor="apellidos">Apellidos</label>
                <InputText id="apellidos" value={empleadoEditado.Apellidos || ""} onChange={(e) => handleInputChange(e, 'Apellidos')} />
                </div>

                {/* Fecha de Nacimiento */}
                <div className="p-field">
                <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                
                <Calendar value={new Date(empleadoEditado.FechaNacimiento)} onChange={(e) => handleInputChange(e, 'FechaNacimiento')} showIcon />
                </div>

                {/* Domicilio */}
                <div className="p-field">
                <label htmlFor="domicilio">Domicilio</label>
                <InputText id="domicilio" value={empleadoEditado.Domicilio|| ""} onChange={(e) => handleInputChange(e, 'Domicilio')} />
                </div>

                {/* Teléfono */}
                <div className="p-field">
                <label htmlFor="telefono">Teléfono</label>
                <InputText id="telefono" value={empleadoEditado.Telefono|| ""} onChange={(e) => handleInputChange(e, 'Telefono')} />
                </div>

            
            </div>
            

            {/*------------------------*/}


            <div className="column">

                {/* Categoría Laboral */}
                <div className="p-field">
                <label htmlFor="categoriaLaboral">Categoría Laboral</label>
                <Dropdown id="categoriaLaboral" value={empleadoEditado.CategoriaLaboral} options={categoriasLaborales} onChange={(e) => handleInputChange(e, 'CategoriaLaboral')} />
                </div>

                {/* Fecha de Ingreso */}
                <div className="p-field">
                <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
                <Calendar id="fechaIngreso" value={new Date(empleadoEditado.FechaIngreso)} onChange={(e) => handleInputChange(e, 'FechaIngreso')} showIcon />
                </div>

                {/* Número de Hijos */}
                <div className="p-field">
                <label htmlFor="numHijos">Número de Hijos</label>
                <InputNumber id="numHijos" value={empleadoEditado.NumHijos|| 0} onChange={(e) => handleInputChange(e, 'NumHijos')} />
                </div>

                {/* Estado Civil */}
                <div className="p-field">
                <label htmlFor="estadoCivil">Estado Civil</label>
                <Dropdown id="estadoCivil" value={empleadoEditado.EstadoCivil} options={estadosCiviles} onChange={(e) => handleInputChange(e, 'EstadoCivil')} />
                </div>

                {/* Contacto de Emergencia */}
                <div className="p-field">
                <label htmlFor="contactoEmergencia">Contacto de Emergencia</label>
                <InputText id="contactoEmergencia" value={empleadoEditado.ContactoEmergencia|| ""} onChange={(e) => handleInputChange(e, 'ContactoEmergencia')} />
                </div>

                {/* IBAN */}
                <div className="p-field">
                <label htmlFor="iban">IBAN</label>
                <InputText id="iban" value={empleadoEditado.IBAN|| ""} onChange={(e) => handleInputChange(e, 'IBAN')} />
                </div>

            </div>

        </div>

        </Dialog>
    );
};

export default EditarEmpleado;
