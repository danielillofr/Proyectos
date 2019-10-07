const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

// let rolesValidos = {
//     values: ['ADMINISTRADOR', 'JEFEPROYECTO', 'INVITADO'],
//     message: '{VALUE} no es un estado válido para el role'
// }


const proyectoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    jefeProyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El jefe de proyecto es requirido']
    },
    fase: {
        type: Number,
        default: 0
    },
    fase1: new Schema({
        rutaRequerimientos: {
            type: String,
            default: ''
        },
        fechaPrevista: {
            type: Date,
            required: [true, 'La fecha prevista de requerimientos es necesaria']
        }
    })
})

// proyectoSchema.methods.toJSON = function() {
//     let user = this;
//     let userObject = user.toObject();
//     // delete userObject.clave;
//     return userObject;
// }

proyectoSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })

module.exports = mongoose.model('Proyecto', proyectoSchema)