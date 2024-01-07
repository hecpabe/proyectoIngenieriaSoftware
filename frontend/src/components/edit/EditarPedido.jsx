import React, { useState,useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './components.css'

const EditarPedido = ({ pedido, visible, onHideDialog,onSavePedido, isEditing }) => {
    const categoriasEstado = ["En Trámite","Cerrado","Entregado","Liquidado"];
    

    const [pedidoEditado, setPedidoEditado] = useState({ ...pedido });

    // Actualiza el estado local cuando cambian las props
    useEffect(() => {
      setPedidoEditado({ ...pedido });
    }, [pedido]);
  
    const handleInputChange = (e, name) => {
      var value=null;
      if (name.includes("cantidad_") || name === 'DescuentoAplicado'){
        value = e.value;
      }
      else if(name === "NombreCompleto"){
        value = e.target.value;
        var idCliente = 0;
        pedidoEditado.Clientes.map((cliente) => {
            if(cliente[1] === value)
                idCliente = cliente[0];
            return;
        });
        setPedidoEditado(prevPedido => ({
            ...prevPedido,
            [name]: value,
            idCliente: idCliente
          }));
        return;
      }
      else{
        value = e.target.value;
      }
      
      setPedidoEditado(prevPedido => ({
        ...prevPedido,
        [name]: value
      }));
    };
  
    const handleSave = () => {
      onSavePedido(pedidoEditado);
      onHideDialog();
    };
    
    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={onHideDialog} className="p-button-text" />
            <Button label="Guardar" icon="pi pi-save"  onClick={handleSave} autoFocus />
        </div>
    );

    return (
        <Dialog header="Crear / Editar pedido" visible={visible} onHide={onHideDialog}  footer={footerContent} headerStyle={{ textAlign: 'center' }} >

        <div className="container p-fluid">

            <div className="column">

                {/* Cliente */}
                <div className="p-field">
                <label htmlFor="client">Cliente</label>
                <Dropdown id="client" value={pedidoEditado.NombreCompleto} options={pedidoEditado.Clientes.map((cliente) => cliente[1])} onChange={(e) => {handleInputChange(e, 'NombreCompleto')}} />
                </div>

                {/* Estado */}
                <div className="p-field">
                <label htmlFor="Estado">Estado</label>
                <Dropdown id="Estado" value={pedidoEditado.Estado} options={categoriasEstado} onChange={(e) => handleInputChange(e, 'Estado')} />
                </div>

                {/* DescuentoAplicado */}
                <div className="p-field">
                <label htmlFor="DescuentoAplicado">Descuento Aplicado</label>
                <InputNumber id="DescuentoAplicado" value={pedidoEditado.DescuentoAplicado} onChange={(e) => handleInputChange(e, 'DescuentoAplicado')} />
                </div>

            
            </div>
            

            {/*------------------------*/}


            <div className="column">

                {   isEditing ?
                    <>
                        {/* Cantidad de Botellas Total */}
                        <div className="p-field">
                        <label htmlFor="bottlesNumber">Cantidad de botellas</label>
                        <InputNumber id="bottlesNumber" value={pedidoEditado.CantidadBotellas} disabled />
                        </div>
                    </> :
                    pedidoEditado.Productos.map((producto) => {
                        {/* CantidadBotellas */}
                        return <div key={"div_product_" + producto} className="p-field">
                            <label key={"label_product_" + producto} htmlFor={"product_" + producto}>Cantidad de Botellas (Producto {producto})</label>
                            <InputNumber key={"product_" + producto} id={"product_" + producto} value={pedidoEditado["cantidad_" + producto]} onChange={(e) => handleInputChange(e, 'cantidad_' + producto)} />
                        </div>
                    })
                }

            </div>

        </div>

        </Dialog>
    );
};

export default EditarPedido;