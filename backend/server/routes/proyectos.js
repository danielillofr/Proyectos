const Proyecto = require('./../models/proyecto');
const express = require('express');
const app = express();
const _ = require('underscore');
const {Crear_proyecto,Eliminar_proyecto,Completar_fase} = require ('./../dbAccess/proyectos')

const { Autentificar, AutentificarAdmin, AutentificarAdminOUser } = require('./../middlewares/Autentificar');

//Obtener un listado con todos los proyectos. Solo administrador

resumenProyectos = (proyectosDB) => {
    let proyectos = new Array();
    for (let i = 0; i < proyectosDB.length; i++) {
        let fecha = '';
        switch(proyectosDB[i].fase) {
            case 0:{
                fecha = (proyectosDB[i].fechaPrevista)?proyectosDB[i].fechaPrevista:'--';
                break;
            }
            case 1:{
                fecha = (proyectosDB[i].fase1.fechaPrevista)?proyectosDB[i].fase1.fechaPrevista:'--';
                break;
            }
        }
        proyectos.push({
            _id: proyectosDB[i]._id,
            nombre: proyectosDB[i].nombre,
            descripcion: proyectosDB[i].descripcion,
            fase: proyectosDB[i].fase,
            fechaPrevista: fecha
        })
    }
    return proyectos;
} 

app.get('/api/proyectos/todos', [Autentificar, AutentificarAdmin], (req, res) => {
    Proyecto.find({})
            .exec((err, proyectosDB) => {
        if (err) {
            return res.json({
                ok: false,
                errBaseDatos: true,
                err
            })
        }
        return res.json({
            ok: true,
            proyectos: resumenProyectos(proyectosDB)
        })
    })
})

//Detalle de un proyecto
app.get('/api/proyectos/detalle/:id', [Autentificar], (req,res) => {
    Proyecto.findById(req.params.id, (err, proyectoDB)=> {
        if (err) {
            return res.json({
                ok: false,
                errBaseDatos: true,
                err
            })
        }
        return res.json({
            ok:true,
            proyecto: proyectoDB
        })
    })
})

//Crear un nuevo proyecto
app.post('/api/proyectos', [Autentificar], (req,res) => {
    const datosProyecto = req.body;
    if ((!datosProyecto.nombre) || (!datosProyecto.descripcion) || (!datosProyecto.jefeProyecto) || (!datosProyecto.fechaPrevista)
        || (!datosProyecto.fechaCreacion)) {
        return res.json({
            ok: false,
            errBaseDatos: false,
            err: 'Faltan parámetros obligatorios'
        })
    }
    Crear_proyecto(datosProyecto)
        .then(proyecto => {
            return res.json({
                ok: true,
                proyecto
            })
        })
        .catch(err => {
            return res.json({
                ok: false,
                errBaseDatos: true,
                err
            })
        })
})

//Eliminar proyecto

app.delete('/api/proyectos/:id', [Autentificar], (req,res) => {
    const id = req.params.id;
    Eliminar_proyecto(id)
        .then(borrado => {
            return res.json({
                ok: true,
                borrado
            })
        })
        .catch(err=>{
            return res.json({
                ok: false,
                errBaseDatos: true,
                err
            })
        })
})

app.put('/api/proyectos/completar/:id', [Autentificar], (req,res) => {
    let body = req.body;
    console.log('Body:',body);
    const id = req.params.id;
    if ((!body.fase)) {
        return res.json({
            ok: false,
            errBaseDatos: false,
            err: 'Hay que indicar la fase'
        })
    }
    Completar_fase(id, body)
        .then(proyecto => {
            return res.json({
                ok: true,
                proyecto
            })
        })
        .catch(error => {
            console.log(error.message);
            return res.json({
                ok: false,
                errBaseDatos: (error.errBaseDatos != null)?error.errBaseDatos:false,
                err: (error.err != null)?error.err:error.message
            })
        })
})

module.exports = app;