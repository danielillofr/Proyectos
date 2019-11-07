const Documento = require('./../models/documento');
const express = require('express');
const app = express();
const _ = require('underscore');
const fileUpload = require('express-fileupload');
const Proyecto = require('./../models/proyecto')
const fs = require('fs');
const {Autentificar} = require('./../middlewares/Autentificar')
const {Anadir_log_cambio_documento} = require('./../dbAccess/logs');
const Log = require('./../models/log')

app.use(fileUpload());

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
        versionN++;                                                                 //Se incrementa en uno
        const ruta = `./documents/${idProyecto}/${tipo}/${versionN}.pdf`;           //Se calcula la ruta
        await Mover_fichero (fichero,ruta);                                         //Se mueve le fichero a su ruta correspondiente
        const documento = await Anadir_documento_a_base(idProyecto,usuario._id,tipo,ruta,versionN);   //Se añade a la base de datos de documentos
        await Actualizar_proyecto(idProyecto,tipo,versionN);                        //Se actualiza la versión del documento en proyectos
        await Anadir_log_cambio_documento(idProyecto,usuario,tipo,versionN);        //Se añade al log
        return documento;
    }catch(err){
        throw new Error(err);
    }
} 


app.post('/api/uploadreq/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
    }
    if (!fs.existsSync(`./documents/${idProyecto}`)) {
        fs.mkdirSync(`./documents/${idProyecto}`);
    }
    if (!fs.existsSync(`./documents/${idProyecto}/REQUERIMIENTOS`)) {
        fs.mkdirSync(`./documents/${idProyecto}/REQUERIMIENTOS`);
    }
    Subir_fichero (idProyecto,req.files.archivo, 'REQUERIMIENTOS',req.usuario)
        .then((documento)=>{
            res.json({
                ok:true,
                documento
            })
        })
        .catch(err=>{
            res.json({
                ok:false,
                err:err.message
            })
        })
})

app.post('/api/uploadesp/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
    }
    if (!fs.existsSync(`./documents/${idProyecto}`)) {
        fs.mkdirSync(`./documents/${idProyecto}`);
    }
    if (!fs.existsSync(`./documents/${idProyecto}/ESPECIFICACIONES`)) {
        fs.mkdirSync(`./documents/${idProyecto}/ESPECIFICACIONES`);
    }
    Subir_fichero (idProyecto,req.files.archivo, 'ESPECIFICACIONES',req.usuario)
        .then((documento)=>{
            res.json({
                ok:true,
                documento
            })
        })
        .catch(err=>{
            res.json({
                ok:false,
                err:err.message
            })
        })
})

app.post('/api/uploadvalint/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
    }
    if (!fs.existsSync(`./documents/${idProyecto}`)) {
        fs.mkdirSync(`./documents/${idProyecto}`);
    }
    if (!fs.existsSync(`./documents/${idProyecto}/VALINT`)) {
        fs.mkdirSync(`./documents/${idProyecto}/VALINT`);
    }
    Subir_fichero (idProyecto,req.files.archivo, 'VALINT',req.usuario)
        .then((documento)=>{
            res.json({
                ok:true,
                documento
            })
        })
        .catch(err=>{
            res.json({
                ok:false,
                err:err.message
            })
        })
})
app.post('/api/uploadvalcal/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
    }
    if (!fs.existsSync(`./documents/${idProyecto}`)) {
        fs.mkdirSync(`./documents/${idProyecto}`);
    }
    if (!fs.existsSync(`./documents/${idProyecto}/VALCAL`)) {
        fs.mkdirSync(`./documents/${idProyecto}/VALCAL`);
    }
    Subir_fichero (idProyecto,req.files.archivo, 'VALCAL',req.usuario)
        .then((documento)=>{
            res.json({
                ok:true,
                documento
            })
        })
        .catch(err=>{
            res.json({
                ok:false,
                err:err.message
            })
        })
})
app.post('/api/uploaddiseno/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
    }
    if (!fs.existsSync(`./documents/${idProyecto}`)) {
        fs.mkdirSync(`./documents/${idProyecto}`);
    }
    if (!fs.existsSync(`./documents/${idProyecto}/DISENO`)) {
        fs.mkdirSync(`./documents/${idProyecto}/DISENO`);
    }
    Subir_fichero (idProyecto,req.files.archivo, 'DISENO',req.usuario)
        .then((documento)=>{
            res.json({
                ok:true,
                documento
            })
        })
        .catch(err=>{
            res.json({
                ok:false,
                err:err.message
            })
        })
})
app.post('/api/uploadcambio/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
    }
    if (!fs.existsSync(`./documents/${idProyecto}`)) {
        fs.mkdirSync(`./documents/${idProyecto}`);
    }
    if (!fs.existsSync(`./documents/${idProyecto}/CAMBIO`)) {
        fs.mkdirSync(`./documents/${idProyecto}/CAMBIO`);
    }
    Subir_fichero (idProyecto,req.files.archivo, 'CAMBIO',req.usuario)
        .then((documento)=>{
            res.json({
                ok:true,
                documento
            })
        })
        .catch(err=>{
            res.json({
                ok:false,
                err:err.message
            })
        })
})

Obtener_documentos_proyecto = (idProyecto, tipo) => {
    return new Promise((resolve,reject) => {
        Documento.find({proyecto: idProyecto}, (err, documentosDB) => {
            if (err){
                reject({
                    message: err
                })
            }else{
                resolve(documentosDB)
            }
        })
    })
}

app.get('/api/documents/:idProyecto', [Autentificar],(req,res) => {
    Obtener_documentos_proyecto(req.params.idProyecto,'REQUERIMIENTOS')
        .then(documentos=>{
            res.json({
                ok: true,
                documentos
            })
        })
        .catch(err=>{
            res.json({
                ok: false,
                err: err.message
            })
        })
})

module.exports = app;