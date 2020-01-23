const Documento = require('./../models/documento');
const express = require('express');
const app = express();
const _ = require('underscore');
const {Autentificar} = require('./../middlewares/Autentificar')
const {Subir_fichero} = require('./../dbAccess/documentos')
const {Obterner_proyecto_completo} = require ('./../dbAccess/proyectos')




app.post('/api/uploadreq/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
    }
    Subir_fichero (idProyecto,req.files.archivo, 'REQUERIMIENTOS',req.usuario)
        .then((proyecto)=>{
            Obterner_proyecto_completo(idProyecto)
                .then(proyecto => {
                    return res.json({
                        ok: true,
                        proyecto
                    })
                })
                .catch(err => {
                    console.log('Error capturado 2:',err)
                    return res.json({
                        ok: false,
                        errBaseDatos: true,
                        err: err.message
                    })
                })
        })
        .catch(err=>{
            res.json({
                ok:false,
                err:err.message
            })
        })
})

app.post('/api/uploadesp1/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
    }
    Subir_fichero (idProyecto,req.files.archivo, 'ESPECIFICACIONES1',req.usuario)
        .then((proyecto)=>{
            Obterner_proyecto_completo(idProyecto)
                .then(proyecto => {
                    return res.json({
                        ok: true,
                        proyecto
                    })
                })
                .catch(err => {
                    console.log('Error capturado 2:',err)
                    return res.json({
                        ok: false,
                        errBaseDatos: true,
                        err: err.message
                    })
                })
        })
        .catch(err=>{
            res.json({
                ok:false,
                err:err.message
            })
        })
})
app.post('/api/uploadesp2/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
    }
    Subir_fichero (idProyecto,req.files.archivo, 'ESPECIFICACIONES2',req.usuario)
        .then((proyecto)=>{
            Obterner_proyecto_completo(idProyecto)
                .then(proyecto => {
                    return res.json({
                        ok: true,
                        proyecto
                    })
                })
                .catch(err => {
                    console.log('Error capturado 2:',err)
                    return res.json({
                        ok: false,
                        errBaseDatos: true,
                        err: err.message
                    })
                })
        })
        .catch(err=>{
            res.json({
                ok:false,
                err:err.message
            })
        })
})
app.post('/api/uploadesp3/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
    }
    Subir_fichero (idProyecto,req.files.archivo, 'ESPECIFICACIONES3',req.usuario)
        .then((proyecto)=>{
            Obterner_proyecto_completo(idProyecto)
                .then(proyecto => {
                    return res.json({
                        ok: true,
                        proyecto
                    })
                })
                .catch(err => {
                    console.log('Error capturado 2:',err)
                    return res.json({
                        ok: false,
                        errBaseDatos: true,
                        err: err.message
                    })
                })
        })
        .catch(err=>{
            res.json({
                ok:false,
                err:err.message
            })
        })
})
app.post('/api/uploadesp4/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
    }
    Subir_fichero (idProyecto,req.files.archivo, 'ESPECIFICACIONES4',req.usuario)
        .then((proyecto)=>{
            Obterner_proyecto_completo(idProyecto)
                .then(proyecto => {
                    return res.json({
                        ok: true,
                        proyecto
                    })
                })
                .catch(err => {
                    console.log('Error capturado 2:',err)
                    return res.json({
                        ok: false,
                        errBaseDatos: true,
                        err: err.message
                    })
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
    Subir_fichero (idProyecto,req.files.archivo, 'VALINT',req.usuario)
        .then((proyecto)=>{
            Obterner_proyecto_completo(idProyecto)
                .then(proyecto => {
                    return res.json({
                        ok: true,
                        proyecto
                    })
                })
                .catch(err => {
                    console.log('Error capturado 2:',err)
                    return res.json({
                        ok: false,
                        errBaseDatos: true,
                        err: err.message
                    })
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
    Subir_fichero (idProyecto,req.files.archivo, 'VALCAL',req.usuario)
        .then((proyecto)=>{
            Obterner_proyecto_completo(idProyecto)
                .then(proyecto => {
                    return res.json({
                        ok: true,
                        proyecto
                    })
                })
                .catch(err => {
                    console.log('Error capturado 2:',err)
                    return res.json({
                        ok: false,
                        errBaseDatos: true,
                        err: err.message
                    })
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
    Subir_fichero (idProyecto,req.files.archivo, 'DISENO',req.usuario)
        .then((proyecto)=>{
            Obterner_proyecto_completo(idProyecto)
                .then(proyecto => {
                    return res.json({
                        ok: true,
                        proyecto
                    })
                })
                .catch(err => {
                    console.log('Error capturado 2:',err)
                    return res.json({
                        ok: false,
                        errBaseDatos: true,
                        err: err.message
                    })
                })
        })
        .catch(err=>{
            res.json({
                ok:false,
                err:err.message
            })
        })
})
app.post('/api/uploaddiseno2/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
    }
    Subir_fichero (idProyecto,req.files.archivo, 'DISENO2',req.usuario)
        .then((proyecto)=>{
            Obterner_proyecto_completo(idProyecto)
                .then(proyecto => {
                    return res.json({
                        ok: true,
                        proyecto
                    })
                })
                .catch(err => {
                    console.log('Error capturado 2:',err)
                    return res.json({
                        ok: false,
                        errBaseDatos: true,
                        err: err.message
                    })
                })
        })
        .catch(err=>{
            res.json({
                ok:false,
                err:err.message
            })
        })
})
app.post('/api/uploaddiseno3/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
    }
    Subir_fichero (idProyecto,req.files.archivo, 'DISENO3',req.usuario)
        .then((proyecto)=>{
            Obterner_proyecto_completo(idProyecto)
                .then(proyecto => {
                    return res.json({
                        ok: true,
                        proyecto
                    })
                })
                .catch(err => {
                    console.log('Error capturado 2:',err)
                    return res.json({
                        ok: false,
                        errBaseDatos: true,
                        err: err.message
                    })
                })
        })
        .catch(err=>{
            res.json({
                ok:false,
                err:err.message
            })
        })
})
app.post('/api/uploaddiseno4/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
    }
    Subir_fichero (idProyecto,req.files.archivo, 'DISENO4',req.usuario)
        .then((proyecto)=>{
            Obterner_proyecto_completo(idProyecto)
                .then(proyecto => {
                    return res.json({
                        ok: true,
                        proyecto
                    })
                })
                .catch(err => {
                    console.log('Error capturado 2:',err)
                    return res.json({
                        ok: false,
                        errBaseDatos: true,
                        err: err.message
                    })
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
    Subir_fichero (idProyecto,req.files.archivo, 'CAMBIO',req.usuario)
        .then((proyecto)=>{
            Obterner_proyecto_completo(idProyecto)
                .then(proyecto => {
                    return res.json({
                        ok: true,
                        proyecto
                    })
                })
                .catch(err => {
                    console.log('Error capturado 2:',err)
                    return res.json({
                        ok: false,
                        errBaseDatos: true,
                        err: err.message
                    })
                })
        })
        .catch(err=>{
            res.json({
                ok:false,
                err:err.message
            })
        })
})

app.post('/api/uploadpruint/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
    }
    Subir_fichero (idProyecto,req.files.archivo, 'PRUINT',req.usuario)
        .then((proyecto)=>{
            Obterner_proyecto_completo(idProyecto)
                .then(proyecto => {
                    return res.json({
                        ok: true,
                        proyecto
                    })
                })
                .catch(err => {
                    console.log('Error capturado 2:',err)
                    return res.json({
                        ok: false,
                        errBaseDatos: true,
                        err: err.message
                    })
                })
        })
        .catch(err=>{
            res.json({
                ok:false,
                err:err.message
            })
        })
})
app.post('/api/uploadprucal/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
    }
    Subir_fichero (idProyecto,req.files.archivo, 'PRUCAL',req.usuario)
        .then((proyecto)=>{
            Obterner_proyecto_completo(idProyecto)
                .then(proyecto => {
                    return res.json({
                        ok: true,
                        proyecto
                    })
                })
                .catch(err => {
                    console.log('Error capturado 2:',err)
                    return res.json({
                        ok: false,
                        errBaseDatos: true,
                        err: err.message
                    })
                })
        })
        .catch(err=>{
            res.json({
                ok:false,
                err:err.message
            })
        })
})
app.post('/api/uploadmanual/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
    }
    Subir_fichero (idProyecto,req.files.archivo, 'MANUAL',req.usuario)
        .then((proyecto)=>{
            Obterner_proyecto_completo(idProyecto)
                .then(proyecto => {
                    return res.json({
                        ok: true,
                        proyecto
                    })
                })
                .catch(err => {
                    console.log('Error capturado 2:',err)
                    return res.json({
                        ok: false,
                        errBaseDatos: true,
                        err: err.message
                    })
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