const { model, Schema } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String, 
        required: true
    },
    precio: {
        type: Number, 
        required: true
    },
    stock: {
        type: Number, 
        required: true,
    }
})
// Configuracion global (coleccion)
ProductoSchema.method ('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Producto', ProductoSchema);