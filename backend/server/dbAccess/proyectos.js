const Proyecto = require ('./../models/proyecto');

Crear_proyecto = (datosProyecto) => {
    return new Promise((resolve,reject) => {
        const nuevoProyecto = new Proyecto({
            nombre: datosProyecto.nombre,
            descripcion: datosProyecto.descripcion,
            jefeProyecto: datosProyecto.jefeProyecto,
            fase1: {
                fechaPrevista: datosProyecto.fechaPrevista
            }        
        })
        nuevoProyecto.save((err, proyectoDB) => {
            if (err) {
                reject(err);
            }else{
                resolve(proyectoDB);
            }
        })
    })
}

Eliminar_proyecto = (idProyecto) => {
    return new Promise((resolve,reject) => {
        Proyecto.findByIdAndDelete(idProyecto, (err, proyectoBorrado) => {
            if (err) {
                reject(err);
            }else if (proyectoBorrado){
                resolve(true);
            }else{
                resolve(false);
            }
        })
    })
}

module.exports = {Crear_proyecto,Eliminar_proyecto}

