var mongoose = require('mongoose');
var schema = mongoose.Schema;
const { ObjectId } = schema.Types;

var estadosValidos = {
  values: ['APROBADO', 'RECHAZADO'],
  message: '{VALUE} no es un rol permitido'
};


var usuarioSchema = new schema({
  nombre: {type: String, required: [true, 'El nombre es obligatorio']},
  correo: {type: String, unique:[true, 'El correo debe ser unico'], required: [true, 'El correo es necesario']},
  clave: {type: String, required: [true, 'La clave es necesaria']},
  cedula: { type: String,unique:[true, 'El correo debe ser unico'], required: [true, 'La cedula es obligatorio']},
  creditos: [{type: ObjectId, ref: 'Credito'}],
  estadoDeCredito: {type: String, enum: estadosValidos, default: 'APROBADO', required: false},




});

module.exports = mongoose.model("Usuario", usuarioSchema);