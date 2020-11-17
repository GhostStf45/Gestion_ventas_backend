/*
    Path: '/api/productos'

*/

const { Router } = require('express');

const { getProductos, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos');

const router = Router();

/* RUTAS */
router.get('/', getProductos);
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;