import React, { useState,useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './components.css'

const VerFactura = ({ pedido, visible, onHideDialog }) => {
    const categoriasEstado = ["En Trámite","Cerrado","Entregado","Liquidado"];
    

    const [pedidoEditado, setPedidoEditado] = useState({ ...pedido });

    // Actualiza el estado local cuando cambian las props
    useEffect(() => {
      setPedidoEditado({ ...pedido });
    }, [pedido]);
    
    const footerContent = (
        <div>
            <Button label="Cerrar vista" icon="pi pi-times" onClick={onHideDialog} className="p-button-text" />
        </div>
    );

    return (
        <Dialog header="Ver factura" visible={visible} onHide={onHideDialog}  footer={footerContent} headerStyle={{ textAlign: 'center' }} >

        <div className="container p-fluid">

            <div className="column">

                {/* Número de Pedido */}
                <div className="p-field">
                <label htmlFor="numeroPedido">Número de pedido</label>
                <InputNumber id="numeroPedido" value={pedidoEditado.idPedido} disabled />
                </div>

                {/* Nombre cliente */}
                <div className="p-field">
                <label htmlFor="Nombre">Nombre</label>
                <InputText id="Nombre" value={pedidoEditado.Nombre + " " + pedidoEditado.Apellidos} disabled />
                </div>

                {/* Estado */}
                <div className="p-field">
                <label htmlFor="Estado">Estado</label>
                <Dropdown id="Estado" value={pedidoEditado.Estado} options={categoriasEstado} disabled />
                </div>

                {/* Número de botellas */}
                <div className="p-field">
                <label htmlFor="numeroBotellas">Número de botellas</label>
                <InputNumber id="numeroBotellas" value={pedidoEditado.CantidadBotellas} disabled />
                </div>

            
            </div>
            

            {/*------------------------*/}


            <div className="column">

                {   
                    pedidoEditado.datosProductos.map((producto) => {
                        return <div key={"div_" + producto.idProducto}>
                            <h3 key={"title_" + producto.idProducto}>Producto {producto.idProducto}</h3>
                            <p key={"desc_" + producto.idProducto}>Descripción: {producto.DescripcionProducto}</p>
                            <p key={"number_" + producto.idProducto}>Cantidad: {producto.Cantidad}</p>
                            <h4 key={"price_" + producto.idProducto}>Precio: {producto.PrecioProducto}</h4>
                        </div>
                    })
                }

                {/* Número de Pedido */}
                <div className="p-field">
                <label htmlFor="descuento">Descuento aplicado</label>
                <InputNumber id="descuento" value={pedidoEditado.DescuentoAplicado} disabled />
                </div>

                {/* Total sin descuento */}
                <div className="p-field">
                <label htmlFor="totalSinDescuento">Total (Sin descuento)</label>
                <InputNumber id="totalSinDescuento" value={pedidoEditado.totalSinDescuento} disabled />
                </div>

                {/* Total con descuento */}
                <div className="p-field">
                <label htmlFor="totalConDescuento">Total (Con descuento)</label>
                <InputNumber id="totalConDescuento" value={pedidoEditado.totalConDescuento} disabled />
                </div>

                {/* Desglose sin IVA */}
                <div className="p-field">
                <label htmlFor="desgloseSinIVA">Desglose (Sin IVA)</label>
                <InputNumber id="desgloseSinIVA" value={pedidoEditado.totalConDescuento} disabled />
                </div>

                {/* Desglose con IVA */}
                <div className="p-field">
                <label htmlFor="desgloseConIVA">Desglose (Con IVA)</label>
                <InputNumber id="desgloseConIVA" value={pedidoEditado.totalConDescuento * 1.21} disabled />
                </div>

            </div>

        </div>

        </Dialog>
    );
};

export default VerFactura;