USE anadaMaster;

INSERT INTO
Personal(NIF,Nombre,Apellidos,FechaNacimiento,Domicilio,Telefono,ContactoEmergencia,
CategoriaLaboral,FechaIngreso,NumHijos,EstadoCivil,IBAN,CodigoEmpresa,Borrado)
VALUES
/*ID 1*/("123456789A","Juan","Pérez Rodríguez","1995-01-01","Calle San Sebastián, 33, Madrid",123456789,682901538,"Personal","2017-05-30",1,"Casado","ES9220383472736225596279","password12",0),
/*ID 2*/("123456789B","Lucía","López Fernandez","1996-02-02","Calle Sevilla, 2, Madrid",123459876,128907812,"Personal","2020-03-01",0,"Soltero","ES6500818639489656373963","password11",0),
/*ID 3*/("123456789C","Raquel","Martín Beltrán","1990-07-21","Calle Torremolinos, 5, Madrid",987654321,121212121,"Administrativo","2015-08-04",3,"Casado","ES0400812957111774578714","password13",0);

INSERT INTO
MateriasPrimas(nombreMateriaPrima,Fecha,Cantidad,CodigoVinia,DescripcionMateriaPrima,TipoUva,
GradoMadurez,Valoracion,Borrado)
VALUES
/*ID 1*/("Uva 1","2021-05-13",55,33,"Tipo de uva 1","Tempranillo",2,5,0),
/*ID 2*/("Uva 2","2022-06-14",66,21,"Tipo de uva 2","Garnacha",3,3,0),
/*ID 3*/("Uva 3","2023-07-15",77,17,"Tipo de uva 3","Monastrell",1,2,0);

INSERT INTO
Clientes(Nombre,Apellidos,TipoCliente,NIF_CIF,DireccionCliente,Telefono,DireccionEntrega,
DescuentoVolumen,Borrado)
VALUES
/*ID 1*/("Comprador de Vinos S.L.","","Empresa","B21098765","Calle Murillo, 21, Madrid",721987499,"Calle Murillo, 21, Madrid",0,0),
/*ID 2*/("Juan","Fernández Barroso","Particular","123456789F","Calle Lavapiés, 12, Madrid",998877665,"Calle Lavapiés, 12, Madrid",0,0),
/*ID 3*/("Restaurante Pepe S.L.","","Empresa","B21345678","Calle Serrano, 31, Madrid",112233447,"Calle Serrano, 31, Madrid",0,0);

INSERT INTO
Productos(DescripcionProducto,PrecioProducto,FormatoProducto,Cosecha,Borrado)
VALUES
/*ID 1*/("Vino 1",49.95,"Benjamín","1990-01-01",0),
/*ID 2*/("Vino 2",32.95,"Magnum","2010-02-02",0),
/*ID 3*/("Vino 3",74.95,"Imperial","1980-03-03",0);

INSERT INTO
Pedidos(idClienteFK,Estado,CantidadBotellas,DescuentoAplicado,Borrado)
VALUES
/*ID 1*/(1,"En Trámite",6,0,0),
/*ID 2*/(2,"Liquidado",1,0,0),
/*ID 3*/(1,"Cerrado",3,0,0);

INSERT INTO
PreciosProducto_Pedido(idProductoFK,idPedidoFK,Cantidad)
VALUES
/*ID 1*/(1,1,6),
/*ID 2*/(2,2,1),
/*ID 3*/(3,3,2),
/*ID 4*/(1,3,1);
