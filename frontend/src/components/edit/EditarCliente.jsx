import React, { useState,useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import './components.css'

const EditarCliente = ({ cliente, visible, onHideDialog,onSaveCliente }) => {
   


    const [clienteEditado, setClienteEditado] = useState({ ...cliente });

    // Actualiza el estado local cuando cambian las props
    useEffect(() => {
      setClienteEditado({ ...cliente });
    }, [cliente]);
  
    const handleInputChange = (e, name) => {
      var value=null;
      if (name === 'DescuentoVolumen'){
        value = e.value;
      }else{
        value = e.target.value;
      }
      setClienteEditado(prevCliente => ({
        ...prevCliente,
        [name]: value
      }));
    };
  
    const handleSave = () => {
      onSaveCliente(clienteEditado);
      onHideDialog();
    };
    
    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={onHideDialog} className="p-button-text" />
            <Button label="Guardar" icon="pi pi-save"  onClick={handleSave} autoFocus />
        </div>
    );

    return (
        <Dialog header="Editar Cliente" visible={visible} onHide={onHideDialog} style={{ width: '70vw' }} footer={footerContent} headerStyle={{ textAlign: 'center' }} >

        <div className="container p-fluid">

            <div className="column">
                {/* Nombre */}
                <div className="p-field">
                <label htmlFor="nif">Nombre</label>
                <InputText id="nif" value={clienteEditado.Nombre|| ""} onChange={(e) => handleInputChange(e,'Nombre')} />
                </div>

                {/* Apellidos */}
                <div className="p-field">
                <label htmlFor="nombre">Apellidos</label>
                <InputText id="nombre" value={clienteEditado.Apellidos|| ""} onChange={(e) => handleInputChange(e, 'Apellidos')} />
                </div>

                {/* NIF_CIF */}
                <div className="p-field">
                <label htmlFor="nombre">NIF o CIF</label>
                <InputText id="nombre" value={clienteEditado.NIF_CIF|| ""} onChange={(e) => handleInputChange(e, 'NIF_CIF')} />
                </div>


                {/* Telefono */}
                <div className="p-field">
                <label htmlFor="categoriaLaboral">Telefono</label>
                <InputText id="categoriaLaboral" value={clienteEditado.Telefono} onChange={(e) => handleInputChange(e, 'Telefono')} />
                </div>


            </div>
            
            {/*------------------------*/}

            <div className="column">

                {/* Direccion del cliente */}
                <div className="p-field">
                <label htmlFor="nombre">Direccion del Cliente</label>
                <InputText id="nombre" value={clienteEditado.DireccionCliente|| ""} onChange={(e) => handleInputChange(e, 'DireccionCliente')} />
                </div>

                {/* Direccion de Entrega */}
                <div className="p-field">
                <label htmlFor="nombre">Direccion de Entrega</label>
                <InputText id="nombre" value={clienteEditado.DireccionEntrega|| ""} onChange={(e) => handleInputChange(e, 'DireccionEntrega')} />
                </div>


                {/* Descuento Volumen */}
                <div className="p-field">
                <label htmlFor="numHijos">Descuento</label>
                <InputNumber id="numHijos" value={clienteEditado.DescuentoVolumen} onChange={(e) => handleInputChange(e, 'DescuentoVolumen')} />
                </div>



            </div>

        </div>

        </Dialog>
    );
};

export default EditarCliente;
