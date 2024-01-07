import React, { useState,useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import './components.css'

const VerCliente = ({ cliente, visible, onHideDialog }) => {
   
    const tiposCliente = ["Particular","Empresa"];

    const [clienteEditado, setClienteEditado] = useState({ ...cliente });

    // Actualiza el estado local cuando cambian las props
    useEffect(() => {
      setClienteEditado({ ...cliente });
    }, [cliente]);
    
    const footerContent = (
        <div>
            <Button label="Cerrar vista" icon="pi pi-times" onClick={onHideDialog} className="p-button-text" />
        </div>
    );

    return (
        <Dialog header="Ver Cliente" visible={visible} onHide={onHideDialog} style={{ width: '70vw' }} footer={footerContent} headerStyle={{ textAlign: 'center' }} >

        <div className="container p-fluid">

            <div className="column">
                {/* Nombre */}
                <div className="p-field">
                <label htmlFor="nif">Nombre</label>
                <InputText id="nif" value={clienteEditado.Nombre|| ""} disabled />
                </div>

                {/* Apellidos */}
                <div className="p-field">
                <label htmlFor="nombre">Apellidos</label>
                <InputText id="nombre" value={clienteEditado.Apellidos|| ""} disabled />
                </div>

                {/* NIF_CIF */}
                <div className="p-field">
                <label htmlFor="nombre">NIF o CIF</label>
                <InputText id="nombre" value={clienteEditado.NIF_CIF|| ""} disabled />
                </div>


                {/* Telefono */}
                <div className="p-field">
                <label htmlFor="categoriaLaboral">Telefono</label>
                <InputText id="categoriaLaboral" value={clienteEditado.Telefono} disabled />
                </div>


            </div>
            
            {/*------------------------*/}

            <div className="column">

                {/* Direccion del cliente */}
                <div className="p-field">
                <label htmlFor="nombre">Direccion del Cliente</label>
                <InputText id="nombre" value={clienteEditado.DireccionCliente|| ""} disabled />
                </div>

                {/* Direccion de Entrega */}
                <div className="p-field">
                <label htmlFor="nombre">Direccion de Entrega</label>
                <InputText id="nombre" value={clienteEditado.DireccionEntrega|| ""} disabled />
                </div>


                {/* Descuento Volumen */}
                <div className="p-field">
                <label htmlFor="numHijos">Descuento</label>
                <InputNumber id="numHijos" value={clienteEditado.DescuentoVolumen} disabled />
                </div>

                {/* Tipo de cliente */}
                <div className="p-field">
                <label htmlFor="tipoCliente">Tipo de cliente</label>
                <Dropdown id="tipoCliente" value={clienteEditado.TipoCliente} options={tiposCliente} disabled />
                </div>

            </div>

        </div>

        </Dialog>
    );
};

export default VerCliente;
