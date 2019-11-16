const Documento = require('./../models/documento');
const express = require('express');
const app = express();
const _ = require('underscore');
const {Autentificar} = require('./../middlewares/Autentificar')
const {Subir_fichero} = require('./../dbAccess/documentos')




app.post('/api/uploadreq/:idProyecto', [Autentificar],(req,res) => {
    let idProyecto = req.params.idProyecto;
    if (!req.files) {

        return res.send('Nada');
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