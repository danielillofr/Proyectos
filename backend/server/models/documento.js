const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let documentosValidos = {
    values: ['REQUERIMIENTOS', 'ESPECIFICACIONES', 'VALINT', 'VALCAL','DISENO','CAMBIO','PRUINT','PRUCAL','MANUAL'],
    message: '{VALUE} no es un estado válido para el role'
}


const documentoSchema = new Schema({
    proyecto:{
        type: Schema.Types.ObjectId,
        ref: 'Proyecto',
        required: [true, 'El proyecto es requerido']
    },
    fechaCreacion: {
        type: Date,
        required: [true, 'Fecha de creación necesaria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Usuario requerido']
    },
    tipo: {
        type: String,
        default: 'PLANIFICACION',
        enum: documentosValidos
    },
    ruta: {
        type: String,
        required: [true, 'Ruta requerida']
    },
    extension: {
        type: String,
        required: [true, 'Extension requerida']
    },
    version: {
        type: Number,
        default: 0
    },
    nombre: {
        type: String,
        required: [true, '']
    }
})

documentoSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })

module.exports = mongoose.model('Documento', documentoSchema)