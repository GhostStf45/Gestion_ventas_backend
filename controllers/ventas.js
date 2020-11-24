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
const actualizarVenta = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const  venta = await Venta.findById(id);
        if(!venta)
        {
            res.status(400).json({
                 ok:true,
                 msg:'Venta no encontrada por id'
            });
        }
        const cambiosVenta = {
            ...req.body,
            usuario: uid
        }
        const ventaActualizada = await Venta.findByIdAndUpdate(id, cambiosVenta, {new: true});
 
        res.json({
            ok:true,
            venta: ventaActualizada
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }
 
 }
 const borrarVenta = async (req, res = response) => {
    
    const id = req.params.id;

    try {
        const venta = await Venta.findById(id);
        if(!venta)
        {
            res.status(400).json({
                ok:true,
                msg:'Venta no encontrada por id'
            });
        }
        await Venta.findByIdAndDelete(id);
        res.json ({
            ok: true,
            msg: 'Venta eliminada'
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }

    
}

module.exports  = {
    getVentas,
    crearVenta,
    actualizarVenta,
    borrarVenta
}