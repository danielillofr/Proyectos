const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

// let rolesValidos = {
//     values: ['ADMINISTRADOR', 'JEFEPROYECTO', 'INVITADO'],
//     message: '{VALUE} no es un estado válido para el role'
// }

const faseAnalisis = new Schema({
    fase: String,
    recursos: String,
    tiempo: String
})

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

const faseDesarrollo = new Schema({
    nombreBloque: {
        type: String,
        default: ''
    },
    rutaEsquematico: {
        type: String,
        default: ''
    },
    rutaPCB: {
        type: String,
        default: ''
    },
    rutaComponentes: {
        type: String,
        default: ''
    },
    rutaSoftware: {
        type: String,
        default: ''
    }
})

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
    fechaCreacion: {
        type: Date,
        required: [true, 'La fecha de creación es requerida']
    },
    fechaPrevista: {
        type: Date,
        required: [true, 'La fecha de creación es requerida']
    },
    fase: {
        type: Number,
        default: 0
    },
    fase1: {
        fechaCreacion: {
            type: Date,
            default: '2019/01/01'
        },
        rutaRequerimientos: {
            type: String,
            default: ''
        },
        fechaPrevista: {
            type: Date,
            default: '2019/01/01'
        }
    },
    fase2: {
        fechaCreacion: {
            type: Date,
            default: '2019/01/01'
        }, 
        analisis: [faseAnalisis],
        fechaPrevista: {
            type: Date,
            default: '2019/01/01'
        }
    },
    fase3: {
        fechaCreacion: {
            type: Date,
            default: '2019/01/01'
        }, 
        estadoAprobacion: {
            type: Boolean,
            default: false
        },
        motivo: {
            type: String,
            default: ''
        },
        fechaPrevista: {
            type: Date,
            default: '2019/01/01'
        }
    },
    fase4: {
        fechaCreacion: {
            type: Date,
            default: '2019/01/01'
        }, 
        planificacion: [fasePlanificacion],
        fechaPrevista: {
            type: Date,
            default: '2019/01/01'
        }
    },
    fase5: {
        fechaCreacion: {
            type: Date,
            default: '2019/01/01'
        },
        rutaEspecificaciones: {
            type: String,
            default: ''
        },
        fechaPrevista: {
            type: Date,
            default: '2019/01/01'
        }
    },
    fase6: { //Fase desarrollo
        fechaCreacion: {
            type: Date,
            default: '2019/01/01'
        },
        desarrollo: [faseDesarrollo],
        fechaPrevista: {
            type: Date,
            default: '2019/01/01'
        }
    },
    fase7: { //Fase validacion interna
        fechaCreacion: {
            type: Date,
            default: '2019/01/01'
        },
        documentoPrueba: {
            type: String,
            default: ''
        },
        documentoMantis: {
            type: String,
            default: ''
        },
        documentoManual: {
            type: String,
            default: ''
        },
        testProbado: {
            type: Boolean,
            default: false
        },
        fechaPrevista: {
            type: Date,
            default: '2019/01/01'
        }
    },
    fase8: { //Fase validacion calidad
        fechaCreacion: {
            type: Date,
            default: '2019/01/01'
        },
        documentoPrueba: {
            type: String,
            default: ''
        },
        documentoMantis: {
            type: String,
            default: ''
        },
        testProbado: {
            type: Boolean,
            default: false
        },
        fechaPrevista: {
            type: Date,
            default: '2019/01/01'
        }
    },
    fase9: { //Fabricación primera unidad
        fechaCreacion: {
            type: Date,
            default: '2019/01/01'
        },
        primeraUnidad: {
            type: Boolean,
            default: false
        },
        comentarios: {
            type: String,
            default: ''
        },
        fechaPrevista: {
            type: Date,
            default: '2019/01/01'
        }
    },
    fase10: { //Validación primera unidad
        fechaCreacion: {
            type: Date,
            default: '2019/01/01'
        },
        primeraUnidad: {
            type: Boolean,
            default: false
        },
        comentarios: {
            type: String,
            default: ''
        },
        fechaPrevista: {
            type: Date,
            default: '2019/01/01'
        }
    }
})

// proyectoSchema.methods.toJSON = function() {
//     let user = this;
//     let userObject = user.toObject();
//     // delete userObject.clave;
//     return userObject;
// }

proyectoSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })

module.exports = mongoose.model('Proyecto', proyectoSchema)