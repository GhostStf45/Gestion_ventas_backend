/*
    Ventas
    Path: '/api/ventas'

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getVentas,
    crearVenta,
    actualizarVenta,
    borrarVenta,
    getVentaById
} = require ('../controllers/ventas');

const router = Router();

/* APP RUTAS PROTEGIDAS CON JWT*/

router.get('/', validarJWT ,getVentas);
router.post('/',
    [
       validarJWT,
       check('usuario', 'El usuario id es necesario').isMongoId(),
       check('producto', 'El producto id debe de ser valido').isMongoId(),
       check('total', 'El total es obligatorio').not().notEmpty(),
       validarCampos

    ] 
,crearVenta);

router.put('/:id', 
    [
      validarJWT,
      check('total', 'El total es necesario').not().notEmpty(),
      check('usuario', 'El usuario id debe de ser valido').isMongoId(),
      check('producto', 'El producto id debe de ser valido').isMongoId(),
      validarCampos
    ] 
,actualizarVenta);

router.delete('/:id',validarJWT ,borrarVenta);
router.get('/:id',validarJWT ,getVentaById);


module.exports = router;