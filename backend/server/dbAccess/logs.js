const Log = require('./../models/log')

Anadir_log_proyecto_creado = (idProyecto,usuario) => {
    return new Promise((resolve,reject) => {
        const log = new Log({
            fecha: new Date(),
            usuario: usuario._id,
            proyecto: idProyecto,
            texto: 'Proyecto creado'
        });
        log.save((err, logDB) => {
            if (err) {
                reject (err);
            }else{
                resolve(logDB)
            }
        })        
    })
}

Anadir_log_fase_completada = (id,fase,usuario) => {
    return new Promise((resolve,reject) => {
        const log = new Log({
            fecha: new Date(),
            usuario: usuario._id,
            proyecto: id,
            texto: `Fase ${fase} completada`
        });
        log.save((err, logDB) => {
            if (err) {
                reject (err);
            }else{
                resolve(logDB)
            }
        })
    })
} 

Anadir_log_proyecto_modificado = (id,usuario) => {
    return new Promise((resolve,reject) => {
        const log = new Log({
            fecha: new Date(),
            usuario: usuario._id,
            proyecto: id,
            texto: 'Proyecto modificado'
        });
        log.save((err, logDB) => {
            if (err) {
                reject (err);
            }else{
                resolve(logDB)
            }
        })
    })
} 


Obtener_log_proyecto = (id) => {
    return new Promise((resolve,reject) => {
        Log.find({proyecto: id})
           .populate('usuario')
           .exec((err, logsDB) => {
            if (err) {
                reject(err);
            }else{
                resolve(logsDB)
            }
        })
    })
}

Obtener_todos_logs = () => {
    return new Promise((resolve,reject) => {
        Log.find({})
           .populate('usuario','nombre')
           .populate('proyecto','nombre')
           .exec((err, logsDB) => {
               if (err) {
                   reject(err);
               }else{
                   resolve(logsDB);
               }
           })
    })
}

module.exports = {Anadir_log_proyecto_creado,Anadir_log_fase_completada,Obtener_log_proyecto,Obtener_todos_logs,Anadir_log_proyecto_modificado}