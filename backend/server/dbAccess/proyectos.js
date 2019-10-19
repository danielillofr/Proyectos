const Proyecto = require ('./../models/proyecto');

Crear_proyecto = (datosProyecto) => {
    return new Promise((resolve,reject) => {
        const nuevoProyecto = new Proyecto({
            nombre: datosProyecto.nombre,
            descripcion: datosProyecto.descripcion,
            jefeProyecto: datosProyecto.jefeProyecto,
            fechaPrevista: datosProyecto.fechaPrevista,
            fechaCreacion: datosProyecto.fechaCreacion
        })
        nuevoProyecto.save((err, proyectoDB) => {
            if (err) {
                reject(err);
            }else{
                resolve(proyectoDB);
            }
        })
    })
}

Eliminar_proyecto = (idProyecto) => {
    return new Promise((resolve,reject) => {
        Proyecto.findByIdAndDelete(idProyecto, (err, proyectoBorrado) => {
            if (err) {
                reject(err);
            }else if (proyectoBorrado){
                resolve(true);
            }else{
                resolve(false);
            }
        })
    })
}

Completar_fase = (id,datos) => {
    return new Promise((resolve, reject) => {
        console.log(datos);
        switch(datos.fase) {
            case '1': {//Requerimientos
                if ((!datos.rutaRequerimientos) || (!datos.fechaPrevista) || (!datos.fechaCreacion)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Fecha de creación, ruta de requerimientos y fecha prevista necesarias'
                    })
                }else{
                    const actualizacion = {
                        fase: 1,
                        fase1: {
                            rutaRequerimientos: datos.rutaRequerimientos,
                            fechaPrevista: datos.fechaPrevista,
                            fechaCreacion: datos.fechaCreacion
                        }
                    }
                    Proyecto.findByIdAndUpdate (id, actualizacion, {new: true},(err, proyectoAct) => {
                        if (err) {
                            reject({
                                errBaseDatos: true,
                                err
                            })
                        }else{
                            resolve (proyectoAct);
                        }
                    })
                }
            }break;
            default:{
                reject({
                    errBaseDatos: false,
                    err: 'Fase no valida'
                })
            }
        }
    })
}

module.exports = {Crear_proyecto,Eliminar_proyecto,Completar_fase}

