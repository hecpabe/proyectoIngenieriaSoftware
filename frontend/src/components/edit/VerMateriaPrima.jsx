import React, { useState,useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import './components.css'

const VerMateriaPrima = ({ materiaPrima, visible, onHideDialog }) => {
    const tiposUva = ["Tempranillo","Garnacha","Mencía","Monastrell"];
    

    const [materiaPrimaEditado, setMateriaPrimaEditado] = useState({ ...materiaPrima });

    // Actualiza el estado local cuando cambian las props
    useEffect(() => {
      setMateriaPrimaEditado({ ...materiaPrima });
    }, [materiaPrima]);

    
    const footerContent = (
        <div>
            <Button label="Cerrar vista" icon="pi pi-times" onClick={onHideDialog} className="p-button-text" />
        </div>
    );

    return (
        <Dialog header="Ver prima" visible={visible} onHide={onHideDialog}  footer={footerContent} headerStyle={{ textAlign: 'center' }} >

        <div className="container p-fluid">

            <div className="column">
                {/* nNombre de la materia */}
                <div className="p-field">
                <label htmlFor="Nombre">Nombre de la Materia</label>
                <InputText id="Nombre" value={materiaPrimaEditado.nombreMateriaPrima|| ""} disabled />
                </div>

                {/* Fecha */}
                <div className="p-field">
                <label htmlFor="Fecha">Fecha</label>
                { 
                  materiaPrima.Fecha ?
                  <Calendar id="Fecha" value={new Date(materiaPrimaEditado.Fecha)} disabled showIcon/> :
                  <Calendar id="Fecha" disabled showIcon/>
                }
                </div>

                {/* Cantidad */}
                <div className="p-field">
                <label htmlFor="Cantidad">Cantidad</label>
                <InputNumber id="Cantidad" value={materiaPrimaEditado.Cantidad || ""} disabled />
                </div>

                {/* Descropcion */}
                <div className="p-field">
                <label htmlFor="DescripcionMateriaPrima">Descripcion de la Materia Prima</label>
                <InputText id="DescripcionMateriaPrima" value={materiaPrimaEditado.DescripcionMateriaPrima} disabled />
                </div>
            
            </div>
            

            {/*------------------------*/}


            <div className="column">



                {/* Codigo de Viña */}
                <div className="p-field">
                <label htmlFor="CodigoVinia">Código de Viña</label>
                <InputNumber id="CodigoVinia" value={materiaPrimaEditado.CodigoVinia || 0} disabled />
                </div>


                {/* Tipo de uva */}
                <div className="p-field">
                <label htmlFor="TipoUva">Tipo de Uva</label>
                <Dropdown id="TipoUva" value={materiaPrimaEditado.TipoUva||""} options={tiposUva} disabled />
                </div>

                {/* Grado de madurez */}
                <div className="p-field">
                <label htmlFor="GradoMadurez">Grado de Madurez</label>
                <InputNumber id="GradoMadurez" value={materiaPrimaEditado.GradoMadurez|| 0} disabled />
                </div>

                {/* Valoracion */}
                <div className="p-field">
                <label htmlFor="Valoracion">Valoracion</label>
                {/* <Dropdown id="Valoracion" value={materiaPrimaEditado.Valoracion} options={categoriasValoraciones} onChange={(e) => handleInputChange(e, 'Valoracion')} /> */}
                <Rating id='Valoracion' value={materiaPrimaEditado.Valoracion} disabled cancel={false} />
                </div>

            </div>

        </div>

        </Dialog>
    );
};

export default VerMateriaPrima;
