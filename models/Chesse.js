const { Schema, model } = require('mongoose');

const ChesseSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    chesse: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});



module.exports = model('Categoria',CategoriaSchema );
