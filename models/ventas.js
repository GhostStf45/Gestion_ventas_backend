const { model, Schema } = require('mongoose');

const VentaSchema = Schema({
    producto:{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true

    },
    usuario: {
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});
// Configuracion global (coleccion)
VentaSchema.method ('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Venta', VentaSchema);