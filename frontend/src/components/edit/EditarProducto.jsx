import React, { useState,useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import './components.css'

const EditarProducto = ({ producto, visible, onHideDialog,onSaveProducto }) => {
    const formatoProducto = ['Benjamín', 'Magnum'];


    const [productoEditado, setProductoEditado] = useState({ ...producto });

    // Actualiza el estado local cuando cambian las props
    useEffect(() => {
      setProductoEditado({ ...producto });
    }, [producto]);
  
    const handleInputChange = (e, name) => {
      var value=null;
      if (name === 'PrecioProducto'){
        value = e.value;
      }else{
        value = e.target.value;
      }
      setProductoEditado(prevProducto => ({
        ...prevProducto,
        [name]: value
      }));
    };
  
    const handleSave = () => {
      onSaveProducto(productoEditado);
      onHideDialog();
    };
    
    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={onHideDialog} className="p-button-text" />
            <Button label="Guardar" icon="pi pi-save"  onClick={handleSave} autoFocus />
        </div>
    );

    return (
        <Dialog header="Editar Producto" visible={visible} onHide={onHideDialog} style={{ width: '70vw' }} footer={footerContent} headerStyle={{ textAlign: 'center' }} >

        <div className="container p-fluid">

            <div className="column">
                {/* Descripcion */}
                <div className="p-field">
                <label htmlFor="nif">Descripción</label>
                <InputText id="nif" value={productoEditado.DescripcionProducto|| ""} onChange={(e) => handleInputChange(e,'DescripcionProducto')} />
                </div>

                {/* Año de cosecha */}
                <div className="p-field">
                <label htmlFor="nombre">Año de Cosecha</label>
                <InputText id="nombre" value={productoEditado.Cosecha|| ""} onChange={(e) => handleInputChange(e, 'Cosecha')} />
                </div>

            </div>
            

            {/*------------------------*/}


            <div className="column">

                {/* Categoría Producto */}
                <div className="p-field">
                <label htmlFor="categoriaLaboral">Formato del Producto</label>
                <Dropdown id="categoriaLaboral" value={productoEditado.FormatoProducto} options={formatoProducto} onChange={(e) => handleInputChange(e, 'FormatoProducto')} />
                </div>

                {/* Precio del Producto */}
                <div className="p-field">
                <label htmlFor="numHijos">Precio del Producto</label>
                <InputNumber id="numHijos" value={productoEditado.PrecioProducto} onChange={(e) => handleInputChange(e, 'PrecioProducto')} />
                </div>



            </div>

        </div>

        </Dialog>
    );
};

export default EditarProducto;
