/*
    Usuarios
    Path: '/api/usuarios'

*/

const { Router } = require('express');
const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

/* RUTAS */
router.get('/', validarJWT, getUsuarios);
router.post('/', crearUsuario);
router.put('/:id',validarJWT, actualizarUsuario);
router.delete('/:id', validarJWT, eliminarUsuario);

module.exports = router;