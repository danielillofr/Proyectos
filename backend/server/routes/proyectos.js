const Proyecto = require('./../models/proyecto');
const express = require('express');
const app = express();
const _ = require('underscore');
const {Crear_proyecto,Eliminar_proyecto} = require ('./../dbAccess/proyectos')

const { Autentificar, AutentificarAdmin, AutentificarAdminOUser } = require('./../middlewares/Autentificar');

//Obtener un listado con todos los proyectos. Solo administrador

resumenProyectos = (proyectosDB) => {
    let proyectos = new Array();
    for (let i = 0; i < proyectosDB.length; i++) {
        let fecha = '';
        switch(proyectosDB[i].fase) {
            case 0:{
                fecha = (proyectosDB[i].fase1.fechaPrevista)?proyectosDB[i].fase1.fechaPrevista:'--';
                break;
            }
        }
        proyectos.push({
            _id: proyectosDB[i]._id,
            nombre: proyectosDB[i].nombre,
            descripcion: proyectosDB[i].descripcion,
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

//Crear un nuevo proyecto
app.post('/api/proyectos', [Autentificar], (req,res) => {
    const datosProyecto = req.body;
    if ((!datosProyecto.nombre) || (!datosProyecto.descripcion) || (!datosProyecto.jefeProyecto) || (!datosProyecto.fechaPrevista)) {
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

module.exports = app;