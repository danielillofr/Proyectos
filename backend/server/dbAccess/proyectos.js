const Proyecto = require ('./../models/proyecto');
const _ = require('underscore');

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

Comprabar_fase_correcta = (id,fase) => {
    return new Promise ((resolve,reject) => {
        Proyecto.findById(id, (err, proyectoDB) => {
            if (err) {
                reject ({
                    errBaseDatos: true,
                    err
                })
            }else{
                let faseProyecto = Number(proyectoDB.fase);
                faseProyecto++;

                console.log(proyectoDB.fase);
                if (faseProyecto === Number(fase)) {
                    resolve(true);
                }else{
                    resolve(false);
                }
            }
        })
    })
    
}


Completar_fase = async(id,datos) => {
    console.log('Comprobando fase')
    const faseCorrecta = await Comprabar_fase_correcta(id,datos.fase);
    if (!faseCorrecta) {
        console.log('ERror en la fase')
        throw new Error('No se puede completar la fase en la que no está el proyecto')
    }
    const faseCompletada = await Completar_fase_comprobada(id,datos);
    console.log(faseCorrecta);
    return faseCompletada;
}


Completar_fase_comprobada = async(id,datos) => {
    return new Promise((resolve, reject) => {
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
                        },
                        fechaPrevista: datos.fechaPrevista
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
            case '2': {
                console.log('Analisis:', datos.analisis);
                if ((!datos.analisis) || (!datos.fechaPrevista) || (!datos.fechaCreacion)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Fecha de creación, analisis y fecha prevista necesarias'
                    })
                }else{
                    let pasosAnalisis = new Array();
                    for (let i = 0; i < datos.analisis.length; i++) {
                        let fase = datos.analisis[i];
                        if ((fase.fase) && (fase.recursos) && (fase.tiempo)) {
                            fase = _.pick(fase, ['fase','recursos','tiempo']);
                            pasosAnalisis.push(fase);
                        }
                    }
                    console.log('Pasos:', pasosAnalisis);
                    const actualizacion = {
                        fase: 2,
                        fase2: {
                            fechaCreacion: datos.fechaCreacion,
                            analisis: pasosAnalisis,
                            fechaPrevista: datos.fechaPrevista
                        },
                        fechaPrevista: datos.fechaPrevista
                    }
                    console.log(actualizacion);
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
            case '3':{
                if ((!datos.estadoAprobacion) || (!datos.motivo) || (!datos.fechaPrevista) || (!datos.fechaCreacion)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Fecha de creación, estado aprobacion y fecha prevista necesarias'
                    })
                }else{
                    const actualizacion = {
                        fase: 3,
                        fase3: {
                            fechaCreacion: datos.fechaCreacion,
                            estadoAprobacion: datos.estadoAprobacion,
                            motivo: datos.motivo,
                            fechaPrevista: datos.fechaPrevista
                        },
                        fechaPrevista: datos.fechaPrevista
                    }
                    console.log(actualizacion);
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
            case '4': {
                console.log('Planificacion:', datos.planificacion);
                if ((!datos.planificacion) || (!datos.fechaPrevista) || (!datos.fechaCreacion)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Fecha de creación, planificacion y fecha prevista necesarias'
                    })
                }else{
                    let pasosPlanificacion = new Array();
                    for (let i = 0; i < datos.planificacion.length; i++) {
                        let fase = datos.planificacion[i];
                        if ((fase.fase) && (fase.fechaInicio) && (fase.fechaFin)) {
                            fase = _.pick(fase, ['fase','fechaInicio','fechaFin']);
                            pasosPlanificacion.push(fase);
                        }
                    }
                    console.log('Pasos:', pasosPlanificacion);
                    const actualizacion = {
                        fase: 4,
                        fase4: {
                            fechaCreacion: datos.fechaCreacion,
                            planificacion: pasosPlanificacion,
                            fechaPrevista: datos.fechaPrevista
                        },
                        fechaPrevista: datos.fechaPrevista
                    }
                    console.log(actualizacion);
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
            case '5': {//Especificaciones
                if ((!datos.rutaEspecificaciones) || (!datos.fechaPrevista) || (!datos.fechaCreacion)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Fecha de creación, ruta de especificaciones y fecha prevista necesarias'
                    })
                }else{
                    const actualizacion = {
                        fase: 5,
                        fase5: {
                            rutaEspecificaciones: datos.rutaEspecificaciones,
                            fechaPrevista: datos.fechaPrevista,
                            fechaCreacion: datos.fechaCreacion
                        },
                        fechaPrevista: datos.fechaPrevista
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
            case '6': { //Ruta desarrollo
                if ((!datos.desarrollo) || (!datos.fechaPrevista) || (!datos.fechaCreacion)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Fecha de creación, desarrollo y fecha prevista necesarias'
                    })
                }else{
                    let pasosDesarrollo = new Array();
                    for (let i = 0; i < datos.desarrollo.length; i++) {
                        let bloque = datos.desarrollo[i];
                        if ((bloque.nombreBloque) && (bloque.rutaEsquematico) && (bloque.rutaPCB)
                            && (bloque.rutaComponentes) && (bloque.rutaSoftware)) {
                            bloque = _.pick(bloque, ['nombreBloque','rutaEsquematico','rutaPCB', 'rutaComponentes','rutaSoftware']);
                            pasosDesarrollo.push(bloque);
                        }
                    }
                    console.log('Pasos:', pasosDesarrollo);
                    const actualizacion = {
                        fase: 6,
                        fase6: {
                            fechaCreacion: datos.fechaCreacion,
                            desarrollo: pasosDesarrollo,
                            fechaPrevista: datos.fechaPrevista
                        },
                        fechaPrevista: datos.fechaPrevista
                    }
                    console.log(actualizacion);
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
            case '7':{
                if ((!datos.documentoPrueba) || (!datos.fechaPrevista) || (!datos.fechaCreacion)
                  ||(!datos.documentoMantis) || (!datos.documentoManual) || (!datos.testProbado)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Fecha de creación, documentos y fecha prevista necesarias'
                    })
                }else{
                    const actualizacion = {
                        fase: 7,
                        fase7: {
                            documentoPrueba: datos.documentoPrueba,
                            documentoMantis: datos.documentoMantis,
                            documentoManual: datos.documentoManual,
                            testProbado: datos.testProbado,
                            fechaPrevista: datos.fechaPrevista,
                            fechaCreacion: datos.fechaCreacion
                        },
                        fechaPrevista: datos.fechaPrevista
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
            case '8':{
                if ((!datos.documentoPrueba) || (!datos.fechaPrevista) || (!datos.fechaCreacion)
                  ||(!datos.documentoMantis) || (!datos.testProbado)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Fecha de creación, documentos y fecha prevista necesarias'
                    })
                }else{
                    const actualizacion = {
                        fase: 8,
                        fase8: {
                            documentoPrueba: datos.documentoPrueba,
                            documentoMantis: datos.documentoMantis,
                            testProbado: datos.testProbado,
                            fechaPrevista: datos.fechaPrevista,
                            fechaCreacion: datos.fechaCreacion
                        },
                        fechaPrevista: datos.fechaPrevista
                    }
                    console.log(actualizacion);
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
            case '9':{
                if ((!datos.primeraUnidad) || (!datos.fechaPrevista) || (!datos.fechaCreacion)
                  ||(!datos.comentarios)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Fecha de creación, datos y fecha prevista necesarias'
                    })
                }else{
                    const actualizacion = {
                        fase: 9,
                        fase9: {
                            primeraUnidad: datos.primeraUnidad,
                            comentarios: datos.comentarios,
                            fechaPrevista: datos.fechaPrevista,
                            fechaCreacion: datos.fechaCreacion
                        },
                        fechaPrevista: datos.fechaPrevista
                    }
                    console.log(actualizacion);
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
            case '10':{
                if ((!datos.primeraUnidad) || (!datos.fechaPrevista) || (!datos.fechaCreacion)
                  ||(!datos.comentarios)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Fecha de creación, datos y fecha prevista necesarias'
                    })
                }else{
                    const actualizacion = {
                        fase: 10,
                        fase10: {
                            primeraUnidad: datos.primeraUnidad,
                            comentarios: datos.comentarios,
                            fechaPrevista: datos.fechaPrevista,
                            fechaCreacion: datos.fechaCreacion
                        },
                        fechaPrevista: datos.fechaPrevista
                    }
                    console.log(actualizacion);
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

