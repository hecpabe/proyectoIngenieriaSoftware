

/*
    Título: Products
    Descripción: Componente con el que gestionamos la vista de los productos
    Fecha: 06/01/2024
    Última Modificación: 06/01/2024
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Prime react
import { ConfirmDialog } from "primereact/confirmdialog";
import { Messages } from "primereact/messages";

// Bibliotecas de componentes propios
import Navbar from "../common/Navbar";
import ListToolbar from "../common/ListToolbar";
import ProductsList from "./ProductsList";
import EditarProducto from "../edit/EditarProducto";
import VerProducto from "../edit/VerProducto";

// Utilidades propias
import { checkSessionToken, closeSession } from "../../util/SessionUtils";
import { getProductsRequest, createProductsRequest, editProductsRequest } from "../../util/APIProductsUtils";

// Declaraciones constantes
const filterButtons = [
    {
        id: "btn_filter_name",
        label: "Producto",
        icon: "pi pi-fw pi-filter",
        fieldName: "NombreCompleto",
        order: "none"
    },
    {
        id: "btn_filter_price",
        label: "Precio",
        icon: "pi pi-fw pi-filter",
        fieldName: "PrecioProducto",
        order: "none"
    },
    {
        id: "btn_filter_format",
        label: "Formato",
        icon: "pi pi-fw pi-filter",
        fieldName: "FormatoProducto",
        order: "none"
    },
    {
        id: "btn_filter_date",
        label: "Cosecha",
        icon: "pi pi-fw pi-filter",
        fieldName: "Cosecha",
        order: "none"
    }
];

const addButtons = [
    {
        id: "btn_add1",
        label: "Agregar producto",
        icon: "pi pi-fw pi-plus",
        onClick: () => {
            console.log("FUNCIONA BOTON 1");
        }
    }
];

/* Componente Principal */
function Products({sessionToken, setSessionToken, searchValue, setSearchValue, isAdminWorker, setIsAdminWorker}){

    // Estados
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState(0);

    const [products, setProducts] = useState([]);

    const [productToEdit, setProductToEdit] = useState(null);
    const [productToCreate, setProductToCreate] = useState(null);
    const [productToView, setProductToView] = useState(null);

    // Navigation
    const navigate = useNavigate();

    // Referencias
    const messagesQueue = useRef(null);

    // Variables necesarias
    const sessionEstablished = checkSessionToken(sessionToken);

    // Event handler para la creación de productos
    const handleCreateProduct = (newProduct) => {

        // Función en caso de que la consulta sea correcta
        const onCreateProductSuccess = (data) => {
            // Recargamos la página para que se vuelvan a pedir los datos al back
            window.location.reload();
        }

        // Función en caso de que la consulta sea erronea
        const onCreateProductError = (error) => {
            // Variables necesarias
            const errorData = error.response.data;

            // Si el dato es un objeto, hay errores en la inserción de datos
            if(typeof errorData === "object"){
                // Mostramos el mensaje de error
                var errorParams = "";
                errorData.errors.map((errorParam) => {
                    if(!errorParams.includes(errorParam.param))
                        errorParams += ("\n" + errorParam.param);
                    return;
                });
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al agregar el producto", detail: `Hay errores en la inserción de los siguientes parámetros:${errorParams}`, sticky: true }
                ])
            }
            // Si el código de respuesta es 401 (Unauthorized) hay un error en la sesión, por lo que cerramos la sesión
            else if(error.response.status === 401){
                closeSession(setSessionToken, setIsAdminWorker);
            }
            // Sino, mostramos que ha ocurrido un error desconocido
            else{
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al agregar el producto", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                ])
            }
        }

        // Lanzamos la petición
        createProductsRequest(process.env.REACT_APP_BACK_ROUTE_CREATE_PRODUCTS, newProduct, sessionToken, onCreateProductSuccess, onCreateProductError);

    }

    // Event handler para la edición de productos
    const handleEditProduct = (editedProduct) => {
        
        // Función en caso de que la consulta sea correcta
        const onEditProductSuccess = (data) => {
            // Actualizamos la lista de productos un mensaje de éxito
            setProducts(products.map(product =>
                product.idProducto === editedProduct.idProducto ? editedProduct : product
            ));
            setProductToEdit(null);

            messagesQueue.current.show([
                { severity: "success", summary: "Modificación de producto", detail: "Producto modificado con éxito", sticky: true }
            ])
        }

        // Función en caso de que la consulta sea erronea
        const onEditProductError = (error) => {
            // Variables necesarias
            const errorData = error.response.data;

            // Si el dato es un objeto, hay errores en la inserción de datos
            if(typeof errorData === "object"){
                // Mostramos el mensaje de error
                var errorParams = "";
                errorData.errors.map((errorParam) => {
                    if(!errorParams.includes(errorParam.param))
                        errorParams += ("\n" + errorParam.param);
                    return;
                });
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al editar el producto", detail: `Hay errores en la inserción de los siguientes parámetros:${errorParams}`, sticky: true }
                ])
            }
            // Si tenemos un 401 (Unautorized) hay un error con la sesión, la cerramos
            else if (error.response.status === 401){
                closeSession(setSessionToken, setIsAdminWorker);
            }
            // Sino, mostramos que ha ocurrido un error desconocido
            else{
                messagesQueue.current.show([
                    { severity: "error", summary: "Error al editar el producto", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
                ])
            }
        }

        editProductsRequest(process.env.REACT_APP_BACK_ROUTE_UPDATE_PRODUCTS, editedProduct, sessionToken, onEditProductSuccess, onEditProductError);

    }

    // Creamos el event handler del onclick del botón de agregar
    addButtons[0].onClick = () => {
        const newProduct = {
            idProducto: products.length + 1,
            DescripcionProducto: "",
            PrecioProducto: 0,
            FormatoProducto: "",
            Cosecha: ''
        };
    };

    // Comprobamos que la sesión esté iniciada
    useEffect(() => {
        if(!sessionEstablished){
            navigate(process.env.REACT_APP_ROUTE_LOGIN + "?referrer=" + process.env.REACT_APP_ROUTE_PRODUCTS)
        }
    }, [sessionToken]);

    // Obtenemos la lista de productos del back
    // Función en caso de que la petición sea correcta
    const onProductsGetSuccess = (data) => {

        // Agregamos los productos a la lista agregando el nombre del producto
        setProducts(data.data.map((product) => {
            var newProduct = product;
            newProduct["NombreCompleto"] = `Producto ${product.idProducto}`;
            return newProduct;
        }));

    };

    // Función en caso de que la petición sea erronea
    const onProductsGetError = (error) => {
        console.log("ERROR");
        console.log(error);

        // Si el código de error es 401 (Unauthorized) hay un error en la sesión, por lo que se cierra
        if(error.response.status === 401){
            closeSession(setSessionToken, setIsAdminWorker);
        }
        // Sino, mostramos que ha ocurrido un error
        else{
            messagesQueue.current.show([
                { severity: "error", summary: "Error al obtener la lista de productos", detail: "Ha ocurrido un error desconocido, póngase en contacto con el administrador de la página", sticky: true }
            ])
        }
    }

    // Lanzamos la petición
    useEffect(() => {
        getProductsRequest(process.env.REACT_APP_BACK_ROUTE_GET_PRODUCTS, sessionToken, onProductsGetSuccess, onProductsGetError)
    }, []);

    // Retornamos el código HTML
    return(
        <>
            {
                sessionEstablished &&
                <div>
                    <ConfirmDialog />
                    <Navbar 
                        setSessionToken={setSessionToken} 
                        searchValue={searchValue} 
                        setSearchValue={setSearchValue} 
                        isAdminWorker={isAdminWorker} 
                        setIsAdminWorker={setIsAdminWorker} 
                    />
                    <div className="flex justify-content-center">
                        <h1>Productos</h1>
                    </div>
                    <div className="flex justify-content-center">
                        {/* Alertas */}
                        <Messages ref={messagesQueue} />
                    </div>
                    <div className="flex justify-content-center">
                        <ListToolbar filterButtons={filterButtons} addButtons={addButtons} setSortField={setSortField} setSortOrder={setSortOrder} />
                    </div>
                    <div className="flex justify-content-center">
                        <div className="col-6 mt-2">
                            <ProductsList 
                                products={products} 
                                setProducts={setProducts} 
                                setProductToEdit={setProductToEdit}
                                setProductToView={setProductToView}
                                sortField={sortField} 
                                sortOrder={sortOrder} 
                                searchValue={searchValue}
                                sessionToken={sessionToken}
                                setSessionToken={setSessionToken}
                                setIsAdminWorker={setIsAdminWorker}
                                messagesQueue={messagesQueue}
                            />
                        </div>
                    </div>
                </div>
            }
            {
                productToEdit &&
                <EditarProducto producto={productToEdit} visible={Boolean(productToEdit)} onHideDialog={() => setProductToEdit(null)} onSaveProducto={handleEditProduct} />
            }
            {
                productToCreate &&
                <EditarProducto producto={productToCreate} visible={Boolean(productToCreate)} onHideDialog={() => setProductToCreate(null)} onSaveProducto={handleCreateProduct} />
            }
            {
                productToView &&
                <VerProducto producto={productToView} visible={Boolean(productToView)} onHideDialog={() => setProductToView(null)} />
            }
        </>
    );

}

export default Products;