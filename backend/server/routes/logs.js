const Log = require('./../models/log');
const express = require('express');
const app = express();
const { Autentificar, AutentificarAdmin, AutentificarAdminOUser } = require('./../middlewares/Autentificar');

app.get('/api/logs',[Autentificar],(req,res)=>{
    Log.find({})
       .sort({_id: -1})
       .limit(10)
       .populate('usuario','nombre')
       .populate('proyecto','nombre')
       .exec((err,logs)=>{
           if (!err) {
               return res.json({
                   ok: true,
                   logs
               })
           }else{
               return res.json({
                   ok: false,
                   err
               })
           }
       })

})

module.exports = app;