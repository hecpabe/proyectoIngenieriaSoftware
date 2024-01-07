

/*
    Título: Products List
    Descripción: Componente con el que gestionamos la lista de productos
    Fecha: 06/01/2024
    Última Modificación: 06/01/2024
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
import React from "react";

// Primereact
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Rating } from "primereact/rating";
import { confirmDialog } from "primereact/confirmdialog";

// Utilidades propias
import { closeSession } from "../../util/SessionUtils";
import { deleteProductRequest } from "../../util/APIProductsUtils";

/* Componente Principal */
function ProductsList({products, setProducts, setProductToEdit, setProductToView, sortField, sortOrder, searchValue, sessionToken, setSessionToken, setIsAdminWorker, messagesQueue}){

    // Filtramos los productos en función el search value
    const filteredProducts = products.filter(product => 
        searchValue === "" ||
        product.NombreCompleto.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.DescripcionProducto.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.PrecioProducto.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.FormatoProducto.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.Cosecha.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Plantilla de elemento de la lista de materias primas
    const productsTemplate = (product) => {
        return(
            <>
                <div className="col-12">
                    <div className="flex">
                        <div className="col-8">
                            <div className="flex">
                                <div className="flex align-items-center mr-4">
                                    <Image src={process.env.REACT_APP_WINE_BOTTLE_LOGO + "?a=1"} alt="Image" width="150" />
                                </div>
                                <div>
                                    <h3>{product.NombreCompleto}</h3>
                                    <p>Descripción: {product.DescripcionProducto}</p>
                                    <p>Cosecha: {product.Cosecha}</p>
                                    <p>Formato: {product.FormatoProducto}</p>
                                    <div className="flex">
                                        <div className="flex justify-content-center">
                                            <h5 className="mr-2">Precio: {product.PrecioProducto}€</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 flex justify-content-end">
                            <div>
                                <Button icon="pi pi-fw pi-eye" severity="info" className="mr-2" onClick={
                                    () => {
                                        setProductToView(product);
                                    }
                                } />
                                <Button icon="pi pi-fw pi-pencil" severity="help" className="mr-2" onClick={
                                    () => {
                                        setProductToEdit(product);
                                    }
                                } />
                                <Button icon="pi pi-fw pi-times-circle" severity="danger" onClick={
                                    () => {
                                        confirmDialog({
                                            message: '¿Desea eliminar el producto del sistema?',
                                            header: 'Confirmación de eliminación',
                                            icon: 'pi pi-info-circle',
                                            acceptClassName: 'p-button-danger',
                                            acceptLabel: 'Sí',
                                            rejectLabel: 'No',
                                            accept: () => {
                                                // Función callback en caso de que la petición sea correcta
                                                const onDeleteProductSuccess = (data) => {
                                                    // Sacamos el producto de la lista
                                                    const newProducts = products.filter(currentProduct => currentProduct.idProducto != product.idProducto);
                                                    setProducts(newProducts);
                                                    messagesQueue.current.show([
                                                        { severity: "success", summary: "Producto eliminado", detail: "El producto ha sido eliminado con éxito", sticky: true }
                                                    ])
                                                }
                                                
                                                // Función callback en caso de que la petición sea erronea
                                                const onDeleteProductError = (error) => {
                                                    // Si el error es un 401 (Unauthorized) hay un error con la sesión, por lo que la cerramos
                                                    if(error.response.status === 401){
                                                        closeSession(setSessionToken, setIsAdminWorker);
                                                    }
                                                    // Sino, mostramos que ha ocurrido un error
                                                    else{
                                                        messagesQueue.current.show([
                                                            { severity: "error", summary: "Error al eliminar el producto", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                                                        ])
                                                    }
                                                }

                                                // Lanzamos la petición
                                                deleteProductRequest(process.env.REACT_APP_BACK_ROUTE_DELETE_PRODUCTS, product.idProducto, sessionToken, onDeleteProductSuccess, onDeleteProductError);
                                            }
                                        });
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
                <DataView value={filteredProducts} itemTemplate={productsTemplate} sortField={sortField} sortOrder={sortOrder} />
            </div>
        </>
    );

}

export default ProductsList;