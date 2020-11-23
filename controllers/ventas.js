const { response } = require('express');
const Venta = require('../models/venta');

const getVentas = async (req, res = response) => {
    const ventas = await Venta.find()
                        .populate('usuario', 'nombre')
                        .populate('producto', 'nombre precio')
    res.json ({
        ok: true,
       ventas
    })
}
const crearVenta = async (req, res = response) => {
    const uid = req.uid;
    const venta = new Venta ({
        usuario: uid,
        ... req.body
    });
    try {
        const ventaDB = await venta.save();
        res.status(200).json ({
            ok: true,
            venta: ventaDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
            err: error
        })
    }
    
}
module.exports  = {
    getVentas,
    crearVenta
}