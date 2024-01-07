const { DataTypes} = require("sequelize");
const {sequelize } = require("../config/mysql.js")

//ASOCIACIÓN DE LAS TABLAS
const Personal = sequelize.define("Personal",{
    idPersonal:{
        type: DataTypes.INTEGER,
        primaryKey:true
    },
    NIF:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Apellidos:{
        type: DataTypes.STRING,
        allowNull: false
    },
    FechaNacimiento:{
        type: DataTypes.DATE,
        allowNull: false
    },
    Domicilio:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Telefono:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ContactoEmergencia:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    CategoriaLaboral:{
        type: DataTypes.STRING,
        enum : ["Personal", "Administrativo"],
        allowNull: false
    },
    FechaIngreso:{
        type: DataTypes.DATE,
        allowNull: false
    },
    NumHijos:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    EstadoCivil:{
        type: DataTypes.STRING,
        enum : ["Soltero", "Casado"],
        allowNull: false
    },
    IBAN:{
        type: DataTypes.STRING,
        allowNull: false
    },
    CodigoEmpresa:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Borrado:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName:'Personal',
    timestamps:false
});

const MateriasPrimas = sequelize.define("MateriasPrimas",{
    idMateriaPrrima:{
        type: DataTypes.INTEGER,
        primaryKey:true
    },
    nombreMateriaPrima:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Fecha:{
        type: DataTypes.DATE,
        allowNull: false
    },
    Cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    CodigoVinia:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    DescripcionMateriaPrima:{
        type: DataTypes.STRING,
        allowNull: false
    },
    TipoUva:{
        type: DataTypes.STRING,
        enum : ["Tempranillo","Garnacha","Mencía","Monastrell"],
        allowNull: false
    },
    GradoMadurez:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Valoracion:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Borrado:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName:'MateriasPrimas',
    timestamps:false
});

const Clientes = sequelize.define("Clientes",{
    idCliente:{
        type: DataTypes.INTEGER,
        primaryKey:true
    },
    Nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Apellidos:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    TipoCliente:{
        type: DataTypes.STRING,
        enum : ["Particular","Empresa"],
        allowNull: false
    },
    NIF_CIF:{
        type: DataTypes.STRING,
        allowNull: true
    },
    DireccionCliente:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Telefono:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    DireccionEntrega:{
        type: DataTypes.STRING,
        allowNull: true
    },
    DescuentoVolumen:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Borrado:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{
    tableName:'Clientes',
    timestamps:false
});

const Productos = sequelize.define("Productos",{
    idProducto:{
        type: DataTypes.INTEGER,
        primaryKey:true
    },
    DescripcionProducto:{
        type: DataTypes.STRING,
        allowNull: false
    },
    PrecioProducto:{
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    FormatoProducto:{
        type: DataTypes.STRING,
        enum : ["Benjamín","Magnum","Imperial"],
        allowNull: false
    },
    Cosecha:{
        type: DataTypes.DATE,
        allowNull: false
    },
    Borrado:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName:'Productos',
    timestamps:false
});

const Pedidos = sequelize.define("Pedidos",{
    idPedido:{
        type: DataTypes.INTEGER,
        primaryKey:true
    },
    idClienteFK:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Estado:{
        type: DataTypes.STRING,
        enum : ["En Trámite","Cerrado","Entregado","Liquidado"],
        allowNull: false
    },
    CantidadBotellas:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    DescuentoAplicado:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Borrado:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName:'Pedidos',
    timestamps:false
});

const PreciosProducto_pedido = sequelize.define("PreciosProducto_Pedido",{
    idPrecioProducto_Pedido:{
        type: DataTypes.INTEGER,
        primaryKey:true
    },
    idProductoFK:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idPedidoFK:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName:'PreciosProducto_Pedido',
    timestamps:false
});


//asociamos TODAS las FK------------------------ REVISAR LAS ASOCIACIONES DE TODAS LAS FK
Clientes.hasMany(Pedidos,{
    foreignKey: 'idClienteFK'
});
Pedidos.belongsTo(Clientes,{
    foreignKey: 'idClienteFK', 
    targetKey: 'idCliente'
});

Productos.hasMany(PreciosProducto_pedido,{
    foreignKey: 'idProductoFK'
});
PreciosProducto_pedido.belongsTo(Productos,{
    foreignKey: 'idProductoFK', 
    targetKey: 'idProducto'
});

Pedidos.hasMany(PreciosProducto_pedido,{
    foreignKey: 'idPedidoFK'
});
PreciosProducto_pedido.belongsTo(Pedidos,{
    foreignKey: 'idPedidoFK', 
    targetKey: 'idPedido'
});

module.exports={Personal, MateriasPrimas, Clientes,Productos, Pedidos, PreciosProducto_pedido};