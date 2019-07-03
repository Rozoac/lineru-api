var express = require("express");
var Credito = require("../models/credito");
var Usuario = require("../models/usuario");
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
// ACTUALIZAR CREDITO
// =============================

app.put("/credito/:id", (req, res) => {
  var id = req.params.id;

  Credito.findById(id, (err, credito) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar credito",
        error: err
      });
    }

    if (!credito) {
      return res.status(400).json({
        ok: false,
        mensaje: "El credito con el id" + id + "no existe",
        error: "No existe un credito con ese ID"
      });
    }

    credito.pagoCredito = true;
    
    credito.save((err, creditoGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al actualizar credito",
          error: err
        });
      }
      res.status(200).json({
        ok: true,
        credito: creditoGuardado
      });
    });
  });
});

// =============================
// RECHAZAR CREDITO
// =============================

app.put("/credito/:id/:id_usuario", (req, res) => {
  var id = req.params.id;
  var id_usuario = req.params.id_usuario;

  Credito.findById(id, (err, credito) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar credito",
        error: err
      });
    }

    if (!credito) {
      return res.status(400).json({
        ok: false,
        mensaje: "El credito con el id" + id + "no existe",
        error: "No existe un credito con ese ID"
      });
    }

    credito.estadoDeCredito = 'RECHAZADO';
    
    credito.save((err, creditoGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al actualizar credito",
          error: err
        });
      }
      Usuario.findById(id_usuario,  (err, usuario) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: "Error al buscar usuario",
            error: err
          });
        }

        if (!usuario) {
          return res.status(400).json({
            ok: false,
            mensaje: "El usuario con el id" + id + "no existe",
            error: "No existe un usuario con ese ID"
          });
        }
        usuario.estadoDeCredito = 'RECHAZADO';
        usuario.save((err, usuarioGuardado) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              mensaje: "Error al actualizar usuario",
              error: err
            });
          }

      res.status(200).json({
        ok: true,
        credito: usuarioGuardado
      });
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