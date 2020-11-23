const bcrypt = require('bcryptjs');
const Producto = require('../models/producto');

const getProductos = async (req, res = response) => {

    const desde  = Number(req.query.desde);
    console.log(desde);

    const [ productos, total ] = await Promise.all([
        Producto
            .find({}, 'nombre precio stock')
            .skip(desde)
            .limit(5),
            Producto.countDocuments()
    ]);

    res.json({
        ok: true,
        productos,
        total
    });
}
const crearProducto = async (req, res = response) => {
    const { nombre, precio, stock } = req.body;

    try{
        const existeNombre = await Producto.findOne({nombre});
        if(existeNombre){
            return res.status(400).json({
                ok:false,
                msg: 'El producto ya esta registrado'
            })
        }
        const producto = new Producto (req.body);
        // guardar producto

        await producto.save();

        res.json({
            ok: true,
            producto
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado... revisar logs'
        })
    }
}
const actualizarProducto = async (req, res = response) => {
    const id = req.params.id;
    try {

        const producto = await Producto.findById(id);

        if(!producto){
            res.status(400).json ({
                ok: true,
                msg: 'Hospital no encontrado por id'
            });
        }
         const cambiosProducto = {
             ...req.body
         }
        const productolActualizado = await Producto.findByIdAndUpdate(id, cambiosProducto, { new: true })

        res.json ({
            ok: true,
            producto: productolActualizado
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
}
const eliminarProducto = async (req, res = response) => {
    const id = req.params.id;
    try {

        const producto = await Producto.findById(id);

        if(!producto){
            res.status(400).json ({
                ok: true,
                msg: 'Producto no encontrado por id'
            });
        }
        await Producto.findByIdAndDelete(id);

        res.json ({
            ok: true,
            msg:'Producto eliminado'
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
}
module.exports = {
    getProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}