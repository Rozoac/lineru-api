module.exports.SEED = "asdgasdqwevadd-op!!!-preubacod123213213";

//PUERTO
process.env.PORT = process.env.PORT || 3000;


//ENTORNO

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//BASE DE DATOS
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/lineru'
} else {
    urlDB = "mongodb://rozoac:lineru2019@ds213199.mlab.com:13199/lineru";
}

process.env.URLDB = urlDB;