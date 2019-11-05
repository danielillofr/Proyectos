const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const logSchema = new Schema({
    fecha: {
        type: Date,
        required: [true,'Fecha de log necesaria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true,'El usuario es necesario']
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyecto',
        required: [true, 'El proyecto es necesario']
    },
    texto: {
        type: String,
        required: [true,'El texto es necesario']
    }
})

logSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })

module.exports = mongoose.model('Log', logSchema)
