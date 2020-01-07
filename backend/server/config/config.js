process.env.PORT = process.env.PORT || 3002;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/proyectos';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;