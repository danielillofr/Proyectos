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

function FaseATexto(fase) {
    const faseNum = Number(fase);
    switch (faseNum){
        case 1:{
          cadena = 'Recopilando';
        }break;
        case 2:{
          cadena = 'Analizando';
        }break;
        case 3:{
          cadena = 'Aprobando';
        }break;
        case 4:{
          cadena = 'Planificando';
        }break;
        case 5:{
          cadena = 'Especificando';
        }break;
        case 6:{
          cadena = 'Desarrolando';
        }break;
        case 7:{
          cadena = 'Validando Int';
        }break;
        case 8:{
          cadena = 'Validando Cal';
        }break;
        case 9:{
          cadena = 'Fabricando 1ª';
        }break;
        case 10:{
          cadena = 'Validando 1ª';
        }break;
        case 11:{
          cadena = '--';
        }break;
      }
      return cadena;
}

Anadir_log_fase_completada = (id,fase,usuario) => {
    return new Promise((resolve,reject) => {
        const log = new Log({
            fecha: new Date(),
            usuario: usuario._id,
            proyecto: id,
            texto: `Fase ${FaseATexto(fase)} completada`
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
           .populate('usuario','nombre')
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

Anadir_log_cambio_documento = (idProyecto,usuario,tipo,version) => {
    return new Promise((resolve,reject) => {
        const log = new Log({
            fecha: new Date(),
            usuario: usuario._id,
            proyecto: idProyecto,
            texto: `Subida versión ${version} del documento ${tipo}`            
        })
        log.save((err, logDB) => {
            if(err){
                reject(err);
            }else{
                resolve(logDB);
            }
        })
    })
}

module.exports = {Anadir_log_proyecto_creado,Anadir_log_fase_completada,Obtener_log_proyecto,Obtener_todos_logs,Anadir_log_proyecto_modificado,Anadir_log_cambio_documento}