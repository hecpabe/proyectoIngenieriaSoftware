import React, { useState,useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import './components.css'

const VerProducto = ({ producto, visible, onHideDialog }) => {
    const formatoProducto = ["Benjamín","Magnum","Imperial"];


    const [productoEditado, setProductoEditado] = useState({ ...producto });

    // Actualiza el estado local cuando cambian las props
    useEffect(() => {
      setProductoEditado({ ...producto });
    }, [producto]);
    
    const footerContent = (
        <div>
            <Button label="Cerrar vista" icon="pi pi-times" onClick={onHideDialog} className="p-button-text" />
        </div>
    );

    return (
        <Dialog header="Ver Producto" visible={visible} onHide={onHideDialog} style={{ width: '70vw' }} footer={footerContent} headerStyle={{ textAlign: 'center' }} >

        <div className="container p-fluid">

            <div className="column">
                {/* Descripcion */}
                <div className="p-field">
                <label htmlFor="descripcion">Descripción</label>
                <InputText id="descripcion" value={productoEditado.DescripcionProducto|| ""} disabled />
                </div>

                {/* Año de cosecha */}
                <div className="p-field">
                <label htmlFor="cosecha">Fecha de la cosecha</label>
                { 
                  productoEditado.Cosecha ?
                  <Calendar id="cosecha" value={new Date(productoEditado.Cosecha)} disabled showIcon/> :
                  <Calendar id="cosecha" disabled showIcon/>
                }
                </div>

            </div>
            

            {/*------------------------*/}


            <div className="column">

                {/* Categoría Producto */}
                <div className="p-field">
                <label htmlFor="categoriaLaboral">Formato del Producto</label>
                <Dropdown id="categoriaLaboral" value={productoEditado.FormatoProducto} options={formatoProducto} disabled />
                </div>

                {/* Precio del Producto */}
                <div className="p-field">
                <label htmlFor="numHijos">Precio del Producto</label>
                <InputNumber id="numHijos" value={productoEditado.PrecioProducto} mode="decimal" maxFractionDigits={2} locale="de-DE" disabled />
                </div>



            </div>

        </div>

        </Dialog>
    );
};

export default VerProducto;
