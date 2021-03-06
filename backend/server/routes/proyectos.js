const Proyecto = require('./../models/proyecto');
const Planificacion = require('./../models/planificacion')
const express = require('express');
const app = express();
const _ = require('underscore');
const { Crear_proyecto_con_log, Eliminar_proyecto_completo, Completar_fase, Obterner_proyecto_completo, Modificar_proyecto } = require('./../dbAccess/proyectos')

const { Autentificar, AutentificarAdmin, AutentificarAdminOUser } = require('./../middlewares/Autentificar');

const { Obtener_todos_logs } = require('./../dbAccess/logs')


//Obtener un listado con todos los proyectos. Solo administrador

resumenProyectos = (proyectosDB) => {
    let proyectos = new Array();
    for (let i = 0; i < proyectosDB.length; i++) {
        // let fecha = '';
        // switch(proyectosDB[i].fase) {
        //     case 0:{
        //         fecha = (proyectosDB[i].fechaPrevista)?proyectosDB[i].fechaPrevista:'--';
        //         break;
        //     }
        //     case 1:{
        //         fecha = (proyectosDB[i].fase1.fechaPrevista)?proyectosDB[i].fase1.fechaPrevista:'--';
        //         break;
        //     }
        // }
        proyectos.push({
            _id: proyectosDB[i]._id,
            nombre: proyectosDB[i].nombre,
            descripcion: proyectosDB[i].descripcion,
            fase: proyectosDB[i].fase,
            fechaPrevista: proyectosDB[i].fechaPrevista
        })
    }
    return proyectos;
}

estadisticas = (proyectosDB) => {
    let proyectosEnFase = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < proyectosDB.length; i++) {
        let fase = Number(proyectosDB[i].fase);
        if (fase < 11) {
            proyectosEnFase[fase]++;
        }
    }
    return proyectosEnFase;
}

app.get('/api/proyectos/estadisticas', [Autentificar], (req, res) => {
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
                estadisticas: estadisticas(proyectosDB)
            })
        })
})


app.get('/api/proyectos/todos', [Autentificar], (req, res) => {
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
app.get('/api/proyectos/detalle/:id', [Autentificar], (req, res) => {
    Obterner_proyecto_completo(req.params.id)
        .then(proyecto => {
            return res.json({
                ok: true,
                proyecto
            })
        })
        .catch(err => {
            console.log('Error capturado 2:', err)
            return res.json({
                ok: false,
                errBaseDatos: true,
                err: err.message
            })
        })
})

//Crear un nuevo proyecto
app.post('/api/proyectos', [Autentificar, AutentificarAdmin], (req, res) => {
    const datosProyecto = req.body;
    if ((!datosProyecto.nombre) || (!datosProyecto.descripcion) || (!datosProyecto.jefeProyecto) || (!datosProyecto.fechaPrevista)) {
        return res.json({
            ok: false,
            errBaseDatos: false,
            err: 'Faltan parámetros obligatorios'
        })
    }
    console.log('A crear proyecto');
    Crear_proyecto_con_log(datosProyecto, req.usuario)
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
                err: err.message
            })
        })
})

//Eliminar proyecto

app.delete('/api/proyectos/:id', [Autentificar,AutentificarAdmin], (req, res) => {
    const id = req.params.id;
    console.log('Eliminando:', id);
    Eliminar_proyecto_completo(id)
        .then(borrado => {
            return res.json({
                ok: true,
                borrado
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

app.put('/api/proyectos/completar/:id', [Autentificar,AutentificarAdmin], (req, res) => {
    let body = req.body;
    console.log(body);
    let archivos = null;
    const id = req.params.id;
    if ((!body.fase)) {
        return res.json({
            ok: false,
            errBaseDatos: false,
            err: 'Hay que indicar la fase'
        })
    }
    if (req.files) {
        archivos = req.files
    }
    Completar_fase(id, body, req.usuario, archivos)
        .then(proyecto => {
            // return res.json({
            //     ok: true,
            //     proyecto
            // })
            Obterner_proyecto_completo(id)
                .then(proyecto => {
                    return res.json({
                        ok: true,
                        proyecto
                    })
                })
                .catch(err => {
                    console.log('Error capturado 2:', err)
                    return res.json({
                        ok: false,
                        errBaseDatos: true,
                        err: err.message
                    })
                })
        })
        .catch(error => {
            console.log(error);
            return res.json({
                ok: false,
                errBaseDatos: (error.errBaseDatos != null) ? error.errBaseDatos : false,
                err: (error.err != null) ? error.err : error.message
            })
        })
})

app.get('/api/proyectos/logs', [Autentificar], (req, res) => {
    Obtener_todos_logs()
        .then(logsDB => {
            return res.json({
                ok: true,
                logsDB
            })
        })
        .catch(err => {
            return res.json({
                ok: false,
                err
            })
        })
})

app.put('/api/proyectos/:id', [Autentificar,AutentificarAdmin], (req, res) => {
    const id = req.params.id;
    Modificar_proyecto(id, req.body, req.usuario)
        .then(proyecto => {
            Obterner_proyecto_completo(id)
                .then(proyecto => {
                    return res.json({
                        ok: true,
                        proyecto
                    })
                })
                .catch(err => {
                    console.log('Error capturado 2:', err)
                    return res.json({
                        ok: false,
                        errBaseDatos: true,
                        err: err.message
                    })
                })
        })
        .catch(err => {
            console.log('Error:', err.message)
            return res.json({
                ok: false,
                err: err.message
            })
        })
})

app.get('/api/proyectos/:id/planificaciones', [Autentificar], (req, res) => {
    const id = req.params.id;
    Planificacion.find({ proyecto: id }, (err, planificacionesDB) => {
        if (err) {
            return res.json({
                ok: false,
                errBaseDatos: true,
                err
            })
        }
        return res.json({
            ok: true,
            planificaciones: planificacionesDB
        })
    })
})

module.exports = app;