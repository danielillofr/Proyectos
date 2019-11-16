const Documento = require('./../models/documento');
const Proyecto = require('./../models/proyecto')
const fs = require('fs');
const {Anadir_log_cambio_documento} = require('./../dbAccess/logs');


Mover_fichero = (fichero,ruta) => {
    return new Promise((resolve,reject) => {
        fichero.mv(ruta, (err)=>{
            if (err) {
                reject(err);
            }else{
                resolve(ruta)
            }
        })
    })
}

Obtener_version_proyecto = (idProyecto,tipo) => {
    return new Promise((resolve,reject) => {
        Proyecto.findById(idProyecto, (err, proyectoDB) => {
            if (err){
                reject(err);
            }else{
                if (!proyectoDB) {
                    reject('Proyecto no encontrado');
                    return;
                }
                switch(tipo) {
                    case 'REQUERIMIENTOS':{
                        resolve(proyectoDB.versionReq);
                    }break;
                    case 'ESPECIFICACIONES':{
                        resolve(proyectoDB.versionEsp);
                    }break;
                    case 'VALINT':{
                        resolve(proyectoDB.versionValInt);
                    }break;
                    case 'VALCAL':{
                        resolve(proyectoDB.versionValCal);
                    }break;
                    case 'DISENO':{
                        resolve(proyectoDB.versionDiseno);
                    }break;
                    case 'CAMBIO':{
                        resolve(proyectoDB.versionCambio);
                    }break;
                }
                reject('no hay tipo');
            }
        })
    })
}

Anadir_documento_a_base = (idProyecto, idUsuario, tipo, ruta, version) => {
    return new Promise((resolve,reject) => {
        const documento = new Documento({
            proyecto: idProyecto,
            fechaCreacion: new Date(),
            usuario: idUsuario,
            tipo,
            ruta,
            version
        });
        documento.save((err, documentoDB) => {
            if (err){
                reject(err)
            }else{
                resolve(documentoDB);
            }
        })
    })
}

Actualizar_proyecto = (idProyecto,tipo,version) => {
    return new Promise((resolve,reject) => {
        let actualizacion;
        switch(tipo) {
            case 'REQUERIMIENTOS':{
                actualizacion = {versionReq: version};
            }break;
            case 'ESPECIFICACIONES':{
                actualizacion = {versionEsp: version};
                console.log(actualizacion);
            }break;
            case 'VALINT':{
                actualizacion = {versionValInt: version};
                console.log(actualizacion);
            }break;
            case 'VALCAL':{
                actualizacion = {versionValCal: version};
                console.log(actualizacion);
            }break;
            case 'DISENO':{
                actualizacion = {versionDiseno: version};
                console.log(actualizacion);
            }break;
            case 'CAMBIO':{
                actualizacion = {versionCambio: version};
                console.log(actualizacion);
            }break;
        }
        console.log(actualizacion);
        Proyecto.findByIdAndUpdate(idProyecto, actualizacion, {new: true}, (err, proyectoDB) => {
            if (err){
                reject(err);
            }else{
                resolve(proyectoDB);
            }
        })
    })
}

Subir_fichero = async(idProyecto, fichero,tipo,usuario) => {
    try{
        const version = await Obtener_version_proyecto(idProyecto,tipo);            //Se obtiene la versión actual del documento
        let versionN = Number(version);
        versionN++;     
        if (!fs.existsSync(`./documents/${idProyecto}`)) {
            fs.mkdirSync(`./documents/${idProyecto}`);
        }
        if (!fs.existsSync(`./documents/${idProyecto}/${tipo}`)) {
            fs.mkdirSync(`./documents/${idProyecto}/${tipo}`);
        }
    //Se incrementa en uno
        const ruta = `./documents/${idProyecto}/${tipo}/${versionN}.pdf`;           //Se calcula la ruta
        await Mover_fichero (fichero,ruta);                                         //Se mueve le fichero a su ruta correspondiente
        await Anadir_documento_a_base(idProyecto,usuario._id,tipo,ruta,versionN);   //Se añade a la base de datos de documentos
        const proyecto = await Actualizar_proyecto(idProyecto,tipo,versionN);                        //Se actualiza la versión del documento en proyectos
        await Anadir_log_cambio_documento(idProyecto,usuario,tipo,versionN);        //Se añade al log
        return proyecto;
    }catch(err){
        throw new Error(err);
    }
} 

module.exports = {Subir_fichero}