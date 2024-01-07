

/*
    Título: Bills List
    Descripción: Componente con el que gestionamos la lista de facturas
    Fecha: 07/01/2024
    Última Modificación: 07/01/2024
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
import React from "react";

// Primereact
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { confirmDialog } from "primereact/confirmdialog";

// Utilidades propias
import { closeSession } from "../../util/SessionUtils";
import { getBillRequest } from "../../util/APIOrdersUtils";

/* Componente Principal */
function BillsList({bills, setBills, setBillToView, sortField, sortOrder, searchValue, sessionToken, setSessionToken, setIsAdminWorker, messagesQueue}){

    // Filtramos las facturas en función el search value
    const filteredBills = bills.filter(bill => 
        searchValue === "" ||
        ("Factura de " + bill.NombreCompleto).toLowerCase().includes(searchValue.toLowerCase()) ||
        bill.Estado.toLowerCase().includes(searchValue.toLowerCase()) ||
        bill.CantidadBotellas.toLowerCase().includes(searchValue.toLowerCase()) ||
        bill.DescuentoAplicado.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Plantilla de elemento de la lista de pedidos
    const billsTemplate = (bill) => {
        return(
            <>
                <div className="col-12">
                    <div className="flex">
                        <div className="col-8">
                            <div className="flex">
                                <div className="flex align-items-center mr-4">
                                    <Image src={process.env.REACT_APP_PDF_LOGO + "?a=1"} alt="Image" width="150" />
                                </div>
                                <div>
                                    <h3>Factura de {bill.NombreCompleto}</h3>
                                    <p>Estado: {bill.Estado}</p>
                                    <p>Cantidad de botellas: {bill.CantidadBotellas}</p>
                                    <p>Descuento aplicado: {bill.DescuentoAplicado}%</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 flex justify-content-end">
                            <div>
                                <Button icon="pi pi-fw pi-eye" severity="info" className="mr-2" onClick={
                                    () => {
                                        
                                        // Pedimos la factura al back
                                        // Función en caso de que la petición sea correcta
                                        const onBillGetSuccess = (data) => {
                                            console.log(data.data);
                                            setBillToView(data.data);
                                        }
                                        const onBillGetError = (error) => {
                                            console.log("ERROR");
                                            console.log(error);

                                            // Si el código de error es 401 (Unauthorized) hay un error en la sesión, por lo que se cierra
                                            if(error.response.status === 401){
                                                closeSession(setSessionToken, setIsAdminWorker);
                                            }
                                            // Sino, mostramos que ha ocurrido un error
                                            else{
                                                messagesQueue.current.show([
                                                    { severity: "error", summary: "Error al obtener la factura", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                                                ])
                                            }
                                        }

                                        getBillRequest(process.env.REACT_APP_BACK_ROUTE_GET_BILL, bill.idPedido, sessionToken, onBillGetSuccess, onBillGetError);
                                        
                                    }
                                } />
                                <Button icon="pi pi-fw pi-download" severity="help" className="mr-2" onClick={
                                    () => {
                                        messagesQueue.current.show([
                                            { severity: "success", summary: "Factura descargada", detail: "La factura ha sido descargada con éxito", sticky: true }
                                        ])
                                    }
                                } />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Retornamos el código HTML
    return(
        <>
            <div className="card">
                <DataView value={filteredBills} itemTemplate={billsTemplate} sortField={sortField} sortOrder={sortOrder} />
            </div>
        </>
    );

}

export default BillsList;