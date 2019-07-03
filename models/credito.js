var mongoose = require('mongoose');
var schema = mongoose.Schema;


var creditoSchema = new schema({
  
  valorSolicitado: {type: Number, required: [true, 'El valor solicitado es obligatorio']},
  fechaPagar: {type: Date, required:false },
  pagoCredito:{ type: Boolean, required: false, default: true},


});

module.exports = mongoose.model("Credito", creditoSchema);