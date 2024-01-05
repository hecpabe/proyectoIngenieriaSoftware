import React, { useState,useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import './components.css'

const EditarMateriaPrima = ({ materiaPrima, visible, onHideDialog,onSaveMateriaPrima }) => {
    const categoriasValoraciones = [1,2,3,4,5];
    

    const [materiaPrimaEditado, setMateriaPrimaEditado] = useState({ ...materiaPrima });

    // Actualiza el estado local cuando cambian las props
    useEffect(() => {
      setMateriaPrimaEditado({ ...materiaPrima });
    }, [materiaPrima]);
  
    const handleInputChange = (e, name) => {
      var value=null;
      if (name === 'Cantidad' || name === 'CodigoVinia' || name ==='Valoracion'  ){
        value = e.value;
      }else if(name==='Fecha'){
           
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
      
      setMateriaPrimaEditado(prevMateriaPrima => ({
        ...prevMateriaPrima,
        [name]: value
      }));
    };
  
    const handleSave = () => {
      onSaveMateriaPrima(materiaPrimaEditado);
      onHideDialog();
    };
    
    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={onHideDialog} className="p-button-text" />
            <Button label="Guardar" icon="pi pi-save"  onClick={handleSave} autoFocus />
        </div>
    );

    return (
        <Dialog header="Editar Materia prima" visible={visible} onHide={onHideDialog}  footer={footerContent} headerStyle={{ textAlign: 'center' }} >

        <div className="container p-fluid">

            <div className="column">
                {/* nNombre de la materia */}
                <div className="p-field">
                <label htmlFor="Nombre">Nombre de la Materia</label>
                <InputText id="Nombre" value={materiaPrimaEditado.nombreMateriaPrima|| ""} onChange={(e) => handleInputChange(e,'nombreMateriaPrima')} />
                </div>

                {/* Fecha */}
                <div className="p-field">
                <label htmlFor="Fecha">Fecha</label>
                <Calendar id="Fecha" value={new Date(materiaPrimaEditado.Fecha)} onChange={(e) => handleInputChange(e, 'Fecha')} showIcon/>
                </div>

                {/* Cantidad */}
                <div className="p-field">
                <label htmlFor="Cantidad">Cantidad</label>
                <InputNumber id="Cantidad" value={materiaPrimaEditado.Cantidad || ""} onChange={(e) => handleInputChange(e, 'Cantidad')} />
                </div>

                {/* Descropcion */}
                <div className="p-field">
                <label htmlFor="DescripcionMateriaPrima">Descripcion de la Materia Prima</label>
                <InputText id="DescripcionMateriaPrima" value={materiaPrimaEditado.DescripcionMateriaPrima} onChange={(e) => handleInputChange(e, 'DescripcionMateriaPrima')}  />
                </div>
            
            </div>
            

            {/*------------------------*/}


            <div className="column">



                {/* Codigo de Viña */}
                <div className="p-field">
                <label htmlFor="CodigoVinia">Código de Viña</label>
                <InputNumber id="CodigoVinia" value={materiaPrimaEditado.CodigoVinia || 0} onChange={(e) => handleInputChange(e, 'CodigoVinia')} />
                </div>


                {/* Tipo de uva */}
                <div className="p-field">
                <label htmlFor="TipoUva">Tipo de Uva</label>
                <InputText id="TipoUva" value={materiaPrimaEditado.TipoUva|| ""} onChange={(e) => handleInputChange(e, 'TipoUva')} />
                </div>

                {/* Grado de madurez */}
                <div className="p-field">
                <label htmlFor="GradoMadurez">Grado de Madurez</label>
                <InputText id="GradoMadurez" value={materiaPrimaEditado.GradoMadurez|| ""} onChange={(e) => handleInputChange(e, 'GradoMadurez')} />
                </div>

                {/* Valoracion */}
                <div className="p-field">
                <label htmlFor="Valoracion">Valoracion</label>
                <Dropdown id="Valoracion" value={materiaPrimaEditado.Valoracion} options={categoriasValoraciones} onChange={(e) => handleInputChange(e, 'Valoracion')} />
                </div>

            </div>

        </div>

        </Dialog>
    );
};

export default EditarMateriaPrima;
