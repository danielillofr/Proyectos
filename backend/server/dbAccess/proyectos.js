const Proyecto = require ('./../models/proyecto');
const _ = require('underscore');

const {Anadir_log_proyecto_creado,Anadir_log_fase_completada,Obtener_log_proyecto,Anadir_log_proyecto_modificado} = require ('./logs')

const {Subir_fichero} = require('./documentos')

Crear_proyecto = (datosProyecto) => {
    return new Promise((resolve,reject) => {
        const nuevoProyecto = new Proyecto({
            nombre: datosProyecto.nombre,
            descripcion: datosProyecto.descripcion,
            jefeProyecto: datosProyecto.jefeProyecto,
            fechaPrevista: datosProyecto.fechaPrevista,
            fechaCreacion: new Date(),
            fase0: {
                fechaPrevista: datosProyecto.fechaPrevista
            }
        })
        console.log('A ver que proyecto creamos:', nuevoProyecto);
        nuevoProyecto.save((err, proyectoDB) => {
            if (err) {
                reject(err);
            }else{
                resolve(proyectoDB);
                console.log(proyectoDB);
            }
        })
    })
}


Crear_proyecto_con_log = async(datosProyecto,usuario) => {
    try{
        const proyectoCreado = await Crear_proyecto (datosProyecto);
        console.log(proyectoCreado);
        await Anadir_log_proyecto_creado(proyectoCreado._id, usuario);
        return proyectoCreado;
    }catch(err){
        
        throw new Error (err);
    }
}

Obtener_proyecto = (id) => {
    return new Promise((resolve,reject) => {
        Proyecto.findById(id)
        .populate('jefeProyecto')
        .populate('documentoReq')
        .populate('documentoEsp')
        .populate('documentoDiseno')
        .populate('documentoValInt')
        .populate('documentoPruInt')
        .populate('documentoManual')
        .populate('documentoPruCal')
        .populate('documentoValCal')
        .populate('documentoCambio')
        .exec((err, proyectoDB) => {
            if (err) {
                reject(err);
            }else{
                resolve(proyectoDB)
            }
        })
    })
}


Obterner_proyecto_completo = async(id) => {
    try{
        const proyecto = await Obtener_proyecto(id);
        const logs = await Obtener_log_proyecto(id);
        return({
            proyecto,
            logs
        })
    }catch(err){
        throw new Error(err);
    }
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
                if (!proyectoDB) {
                    reject({
                        errBaseDatos: false,
                        err: 'Proyecto no encontrado'
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
            }
        })
    })
    
}

faseATipo = (fase) => {

}

Completar_fase = async(id,datos,usuario,ficheros) => {
    const faseCorrecta = await Comprabar_fase_correcta(id,datos.fase);
    if (!faseCorrecta) {
        console.log('ERror en la fase')
        throw new Error('No se puede completar la fase en la que no está el proyecto')
    }
    let proyectoCompletado = await Completar_fase_comprobada(id,datos,ficheros);
    console.log(faseCorrecta);
    if (datos.fase == '1') {
        proyectoCompletado = await Subir_fichero(id,ficheros.docReq,'REQUERIMIENTOS',usuario)
    }else if(datos.fase == '5') {
        proyectoCompletado = await Subir_fichero(id,ficheros.docEsp,'ESPECIFICACIONES',usuario)
    }else if(datos.fase == '7') {
        await Subir_fichero(id,ficheros.docPruebas,'PRUINT',usuario);
        await Subir_fichero(id,ficheros.docMantis,'VALINT',usuario);
        proyectoCompletado = await Subir_fichero(id,ficheros.docManual,'MANUAL',usuario);
    }else if(datos.fase == '8') {
        await Subir_fichero(id,ficheros.docPruebas,'PRUCAL',usuario);
        proyectoCompletado = await Subir_fichero(id,ficheros.docMantis,'VALCAL',usuario);
    }
    const logDB = await Anadir_log_fase_completada(id,datos.fase,usuario);
    console.log('Log:', logDB);
    return proyectoCompletado;
}


Completar_fase_comprobada = async(id,datos,ficheros) => {
    console.log('Datos:', datos);
    return new Promise((resolve, reject) => {
        switch(datos.fase) {
            case '1': {//Requerimientos
                if ((!datos.fechaPrevista) || (!ficheros) || (!ficheros.docReq)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Requerimientos y fecha prevista necesarias'
                    })
                }else{
                    const actualizacion = {
                        fase: 1,
                        fase1: {
                            fechaPrevista: datos.fechaPrevista,
                            fechaCreacion: new Date()
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
                if ((!datos.analisis) || (!datos.fechaPrevista)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Analisis y fecha prevista necesarias'
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
                            fechaCreacion: new Date(),
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
                console.log('Aqui era');
                if ((datos.estadoAprobacion === undefined) || (!datos.motivo) || (!datos.fechaPrevista)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Estado aprobacion y fecha prevista necesarias'
                    })
                }else{
                    console.log('Aqui si');
                    const actualizacion = {
                        fase: 3,
                        fase3: {
                            fechaCreacion: new Date(),
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
                if ((!datos.planificacion) || (!datos.fechaPrevista)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Planificacion y fecha prevista necesarias'
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
                            fechaCreacion: new Date(),
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
                console.log('Ficheros:',ficheros);
                if ((!datos.fechaPrevista) || (!ficheros)||
                   (!ficheros.docEsp))
                     {
                    reject({
                        errBaseDatos: false,
                        err: 'Especificaciones y fecha prevista necesarias'
                    })
                }else{
                    const actualizacion = {
                        fase: 5,
                        fase5: {
                            fechaPrevista: datos.fechaPrevista,
                            fechaCreacion: new Date()
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
                if ((!datos.desarrollo) || (!datos.fechaPrevista)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Desarrollo y fecha prevista necesarias'
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
                            fechaCreacion: new Date(),
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
                if ((!datos.fechaPrevista) || (!datos.testProbado)
                || (!ficheros) || (!ficheros.docPruebas) || (!ficheros.docMantis)
                || (!ficheros.docManual)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Documentos y fecha prevista necesarias'
                    })
                }else{
                    const actualizacion = {
                        fase: 7,
                        fase7: {
                            testProbado: datos.testProbado,
                            fechaPrevista: datos.fechaPrevista,
                            fechaCreacion: new Date()
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
                if ((!datos.fechaPrevista) || (!datos.testProbado)
                || (!ficheros) || (!ficheros.docPruebas) || (!ficheros.docMantis)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Documentos y fecha prevista necesarias'
                    })
                }else{
                    const actualizacion = {
                        fase: 8,
                        fase8: {
                            testProbado: datos.testProbado,
                            fechaPrevista: datos.fechaPrevista,
                            fechaCreacion: new Date()
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
                if ((!datos.primeraUnidad) || (!datos.fechaPrevista)
                  ||(!datos.comentarios)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Datos y fecha prevista necesarias'
                    })
                }else{
                    const actualizacion = {
                        fase: 9,
                        fase9: {
                            primeraUnidad: datos.primeraUnidad,
                            comentarios: datos.comentarios,
                            fechaPrevista: datos.fechaPrevista,
                            fechaCreacion: new Date()
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
                if ((!datos.primeraUnidad)
                  ||(!datos.comentarios)) {
                    reject({
                        errBaseDatos: false,
                        err: 'Datos y fecha prevista necesarias'
                    })
                }else{
                    const actualizacion = {
                        fase: 10,
                        fase10: {
                            primeraUnidad: datos.primeraUnidad,
                            comentarios: datos.comentarios,
                            fechaCreacion: new Date()
                        }
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

Modificar_proyectoDB = (id, datos) => {
    return new Promise((resolve,reject) => {
        datos = _.pick(datos, ['nombre','fase','descripcion','fechaPrevista']);
        Proyecto.findByIdAndUpdate(id,datos,{new:true},(err, proyectoDB) => {
            if (err){
                reject(err);
            }else{
                resolve(proyectoDB);
            }
        })
    })
}

Modificar_proyecto = async(id,datos,usuario) => {
    try{
        const proyectoDB = await Modificar_proyectoDB(id,datos);
        await Anadir_log_proyecto_modificado(id,usuario);
        return proyectoDB;
    }catch(err){
        throw new Error(err);
    }
}

module.exports = {Crear_proyecto_con_log,Eliminar_proyecto,Completar_fase,Obterner_proyecto_completo,Modificar_proyecto}

