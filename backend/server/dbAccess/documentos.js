const Documento = require('./../models/documento');
const Proyecto = require('./../models/proyecto')
const fs = require('fs');
const {Anadir_log_cambio_documento} = require('./../dbAccess/logs');
const path = require('path');

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
        Proyecto.findById(idProyecto)
                .populate('documentoReq','version')
                .populate('documentoEsp','version')
                .populate('documentoDiseno','version')
                .populate('documentoValInt','version')
                .populate('documentoPruInt','version')
                .populate('documentoManual','version')
                .populate('documentoPruCal','version')
                .populate('documentoValCal','version')
                .populate('documentoCambio','version')
                .exec((err, proyectoDB) => {
            if (err){
                reject(err);
            }else{
                if (!proyectoDB) {
                    reject('Proyecto no encontrado');
                    return;
                }
                switch(tipo) {
                    case 'REQUERIMIENTOS':{
                        resolve((proyectoDB.documentoReq)?proyectoDB.documentoReq.version:0);
                    }break;
                    case 'ESPECIFICACIONES':{
                        resolve((proyectoDB.documentoEsp)?proyectoDB.documentoEsp.version:0);
                    }break;
                    case 'VALINT':{
                        resolve((proyectoDB.documentoValInt)?proyectoDB.documentoValInt.version:0);
                    }break;
                    case 'VALCAL':{
                        resolve((proyectoDB.documentoValCal)?proyectoDB.documentoValCal.version:0);
                    }break;
                    case 'DISENO':{
                        resolve((proyectoDB.documentoDiseno)?proyectoDB.documentoDiseno.version:0);
                    }break;
                    case 'CAMBIO':{
                        resolve((proyectoDB.documentoCambio)?proyectoDB.documentoCambio.version:0);
                    }break;
                    case 'PRUINT':{
                        resolve((proyectoDB.documentoPruInt)?proyectoDB.documentoPruInt.version:0);
                    }break;
                    case 'PRUCAL':{
                        resolve((proyectoDB.documentoPruCal)?proyectoDB.documentoPruCal.version:0);
                    }break;
                    case 'MANUAL':{
                        resolve((proyectoDB.documentoManual)?proyectoDB.documentoManual.version:0);
                    }break;
                }
                reject('no hay tipo:', tipo);
            }
        })
    })
}

Anadir_documento_a_base = (idProyecto, idUsuario, tipo, ruta, version,nombre,extension) => {
    return new Promise((resolve,reject) => {
        const documento = new Documento({
            proyecto: idProyecto,
            fechaCreacion: new Date(),
            usuario: idUsuario,
            tipo,
            ruta,
            version,
            extension,
            nombre
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

Actualizar_proyecto = (idProyecto,tipo,idDocumento) => {
    return new Promise((resolve,reject) => {
        let actualizacion;
        switch(tipo) {
            case 'REQUERIMIENTOS':{
                actualizacion = {documentoReq: idDocumento};
            }break;
            case 'ESPECIFICACIONES':{
                actualizacion = {documentoEsp: idDocumento};
                console.log(actualizacion);
            }break;
            case 'VALINT':{
                actualizacion = {documentoValInt: idDocumento};
                console.log(actualizacion);
            }break;
            case 'VALCAL':{
                actualizacion = {documentoValCal: idDocumento};
                console.log(actualizacion);
            }break;
            case 'DISENO':{
                actualizacion = {documentoDiseno: idDocumento};
                console.log(actualizacion);
            }break;
            case 'CAMBIO':{
                actualizacion = {documentoCambio: idDocumento};
                console.log(actualizacion);
            }break;
            case 'PRUINT':{
                actualizacion = {documentoPruInt: idDocumento};
                console.log(actualizacion);
            }break;
            case 'PRUCAL':{
                actualizacion = {documentoPruCal: idDocumento};
                console.log(actualizacion);
            }break;
            case 'MANUAL':{
                actualizacion = {documentoManual: idDocumento};
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
        if (!fs.existsSync(`./documents/${idProyecto}/${tipo}/${versionN}`)) {
            fs.mkdirSync(`./documents/${idProyecto}/${tipo}/${versionN}`);
        }
    //Se incrementa en uno
        const extension = path.extname(fichero.name);
        console.log(extension);
        const ruta = `/documents/${idProyecto}/${tipo}/${versionN}/${fichero.name}`;           //Se calcula la ruta
        await Mover_fichero (fichero,`.${ruta}`);                                         //Se mueve le fichero a su ruta correspondiente
        const documento = await Anadir_documento_a_base(idProyecto,usuario._id,tipo,ruta,versionN,fichero.name,extension);   //Se añade a la base de datos de documentos
        const proyecto = await Actualizar_proyecto(idProyecto,tipo,documento._id);                        //Se actualiza la versión del documento en proyectos
        await Anadir_log_cambio_documento(idProyecto,usuario,tipo,versionN);        //Se añade al log
        return proyecto;
    }catch(err){
        throw new Error(err);
    }
} 

module.exports = {Subir_fichero}