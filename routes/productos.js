/*
    Path: '/api/productos'

*/

const { Router } = require('express');

const { getProductos, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos');
const validarJwt = require('../middlewares/validar-jwt');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/* RUTAS */
router.get('/',[ validarJWT ], getProductos);
router.post('/',[ validarJWT ], crearProducto);
router.put('/:id',[ validarJWT ], actualizarProducto);
router.delete('/:id',[ validarJWT ], eliminarProducto);

module.exports = router;