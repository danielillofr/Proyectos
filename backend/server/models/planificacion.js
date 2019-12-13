const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const fasePlanificacion = new Schema({
    fase: {
        type: String,
        default: ''
    },
    fechaInicio: {
        type: Date,
        default: '2019/01/01'        
    },
    fechaFin: {
        type: Date,
        default: '2019/01/01'        
    }
})


const planificacionSchema = new Schema({
    proyecto:{
        type: Schema.Types.ObjectId,
        ref: 'Proyecto',
        required: [true, 'El proyecto es requerido']
    },
    planificacion: [fasePlanificacion],
    fecha: {
        type: Date,
        required: [true, 'La fecha de creación es requerida']
    },


});

planificacionSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })

module.exports = mongoose.model('Planificacion', planificacionSchema)

