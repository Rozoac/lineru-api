var mongoose = require('mongoose');
var schema = mongoose.Schema;

var estadosValidos = {
  values: ['APROBADO', 'RECHAZADO'],
  message: '{VALUE} no es un rol permitido'
};

var creditoSchema = new schema({
  
  valorSolicitado: {type: Number, required: [true, 'El valor solicitado es obligatorio']},
  fechaPagar: {type: Date, required:false },
  pagoCredito:{ type: Boolean, required: true, default: false},
  estadoDeCredito: {type: String, enum: estadosValidos, default: 'APROBADO', required: false},



});

module.exports = mongoose.model("Credito", creditoSchema);