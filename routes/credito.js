var express = require("express");
var Credito = require("../models/credito");
var fs = require("fs");
var app = express();
var mdUsuario = require("../middlewares/usuario");


// =============================
// OBTENER TODOS LOS CREDITOS
// =============================

app.get("/credito", (req, res) => {


    Credito.find({})
      .exec((err, creditos) => {
        if (err) {
          return res
            .status(500)
            .json({
              ok: false,
              mensaje: "Error cargando creditos",
              error: err
            });
        }

          res.status(200).json({
              creditos
            });
        });
});

// =============================
// Crear un credito nuevo
// =============================

app.post("/credito/:id", mdUsuario.usuarioMiddleware, (req, res) => {


  var usuario = req.usuario;

  var credito = new Credito({
    valorSolicitado: req.body.valorSolicitado,
    fechaPagar: req.body.fechaPagar,
    pagoCredito: req.body.pagoCredito,
    
  });
  credito.save();
  usuario.creditos.push(credito);
  usuario.save((err, usuarioGuardado) => {
    res.status(200).json({
      ok: true
    });
  });
});

module.exports = app;