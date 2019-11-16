require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');


const serveIndex = require('serve-index');


mongoose.connect(process.env.URLDB, (err) => {
    if (err) throw err;
    console.log('BASE DE DATOS ONLINE');
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());



app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/documents/', express.static(path.resolve(__dirname, '../documents')), serveIndex(path.resolve(__dirname, '../documents'), {icons: true}));
// app.use(express.static(path.resolve(__dirname, './../../TodoList/dist/ftsock')));

app.use(fileUpload());
app.use(require('./routes/usuarios'));
app.use(require('./routes/proyectos'));
app.use(require('./routes/documentos'));

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', 3000);
});