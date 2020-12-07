const { response } = require('express');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const Venta = require('../models/venta');

const getTodo = async (req, res= response) => {
    const busqueda = req.params.busqueda;

    //expresion regular para la busqueda (i) => insensible
    const  regex = new RegExp(busqueda, 'i');

    //busqueda de usuarios, productos, ventas
    const [usuarios, productos,ventas] = await Promise.all([
         Usuario.find({nombre: regex}),
         Producto.find({nombre: regex}),
         Venta.find({nombre: regex}),
    ]);
    res.status(200).json({
        ok: true,
        usuarios,
        productos,
        ventas
    })
}
const getDocumentosColeccion = async (req, res= response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    //expresion regular para la busqueda (i) => insensible
    const  regex = new RegExp(busqueda, 'i');

    let data = [];
    switch (tabla) {
        case 'ventas':
             data = await Venta.find({nombre: regex})
                                .populate('usuario', 'nombre')
                                .populate('producto','nombre precio');
        break;
        case 'productos':
            data = await  Producto.find({nombre: regex})
        break;
        case 'usuarios':
            data = await Usuario.find({nombre: regex})
        break;
        default:
           return res.status(400).json({
                ok: false,
                msg:'La tabla tiene que ser usuarios/productos/ventas'
            });
        
    }
    //busqueda de usuarios, productos, ventas
    res.status(200).json({
        ok: true,
        resultados: data
    })
}
module.exports = {
    getTodo,
    getDocumentosColeccion
}