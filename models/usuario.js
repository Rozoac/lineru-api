var mongoose = require('mongoose');
var schema = mongoose.Schema;

var estadosValidos = {
  values: ['APROBADO', 'RECHAZADO'],
  message: '{VALUE} no es un rol permitido'
};

var usuarioSchema = new schema({
  nombre: {type: String, required: [true, 'El nombre es obligatorio']},
  correo: {type: String, unique:[true, 'El correo debe ser unico'], required: [true, 'El correo es necesario']},
  clave: {type: String, required: [true, 'La clave es necesaria']},
  cedula: { type: Number,unique:[true, 'El correo debe ser unico'], required: [true, 'La cedula es obligatorio']},
  valorSolicitado: {type: Number, required: [true, 'El valor solicitado es obligatorio']},
  fechaPagar: {type: Date, required:false },
  estadoDeCredito: {type: String, enum: estadosValidos, default: 'APROBADO', required: true},
  pagoCredito:{ type: Boolean, required: true, default: true},


});

module.exports = mongoose.model("Usuario", usuarioSchema);