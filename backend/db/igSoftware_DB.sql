DROP DATABASE IF EXISTS anadaMaster;

CREATE DATABASE anadaMaster;

USE anadaMaster;

CREATE TABLE Personal(
    idPersonal int AUTO_INCREMENT PRIMARY KEY,
    NIF varchar(11) UNIQUE,
    Nombre varchar(20),
    Apellidos varchar(50),
    FechaNacimiento date,
    Domicilio varchar(100),
    Telefono int,
    ContactoEmergencia int,
    CategoriaLaboral enum("Personal","Administrativo"),
    FechaIngreso date,
    NumHijos int,
    EstadoCivil enum("Soltero","Casado"),
    IBAN varchar(50),
    CodigoEmpresa varchar(100) UNIQUE,
    Borrado int,

    check (Borrado >= 0 and Borrado <=1)
);

CREATE TABLE MateriasPrimas(
    idMateriaPrrima int AUTO_INCREMENT PRIMARY KEY,
    nombreMateriaPrima varchar(20),
    Fecha date,
    Cantidad int,
    CodigoVinia int,
    DescripcionMateriaPrima varchar(200),
    TipoUva enum("Tempranillo","Garnacha","Mencía","Monastrell"),
    GradoMadurez int,
    Valoracion int,
    Borrado int,

    check (Borrado >= 0 and Borrado <=1),

    check (Valoracion >=1  and Valoracion <=5)
);

CREATE TABLE Clientes(
    idCliente int AUTO_INCREMENT PRIMARY KEY,
    Nombre varchar(50),
    Apellidos varchar(50),
    TipoCliente enum("Particular","Empresa"),
    NIF_CIF varchar(11),
    DireccionCliente varchar(100),
    Telefono int,
    DireccionEntrega varchar(100),
    DescuentoVolumen int,
    Borrado int,

    check (Borrado >= 0 and Borrado <=1),

    check (DescuentoVolumen >= 0 and DescuentoVolumen <=100)
);

CREATE TABLE Productos(
    idProducto int AUTO_INCREMENT PRIMARY KEY,
    DescripcionProducto varchar(200),
    PrecioProducto decimal(6,2),
    FormatoProducto enum("Benjamín","Magnum","Imperial"),
    /*Fecha de la cosecha*/
    Cosecha date,
    Borrado int,

    check (Borrado >= 0 and Borrado <=1)
);

CREATE TABLE Pedidos(
    idPedido int AUTO_INCREMENT PRIMARY KEY,
    idClienteFK int,
    Estado enum("En Trámite","Cerrado","Entregado","Liquidado"),
    CantidadBotellas int,
    DescuentoAplicado int,
    Borrado int,

    check (Borrado >= 0 and Borrado <=1),

    check (DescuentoAplicado >= 0 and DescuentoAplicado <= 100),

    FOREIGN KEY (idClienteFK)  REFERENCES Clientes(idCliente) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE PreciosProducto_Pedido(
    idPrecioProducto_Pedido int AUTO_INCREMENT PRIMARY KEY,
    idProductoFK int,
    idPedidoFK int,
    Cantidad int,

    check (Cantidad >=1),

    FOREIGN KEY (idProductoFK) REFERENCES Productos(idProducto) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (idPedidoFK) REFERENCES Pedidos(idPedido) ON DELETE CASCADE ON UPDATE CASCADE
);
