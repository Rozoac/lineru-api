var Usuario = require("../models/usuario");

exports.usuarioMiddleware = function (req, res, next) {
   
        Usuario.findById(req.params.id, (err, usuarioDB) => {
            if (err) {
                return res.status(400)
                    .json({
                        ok: false,
                        mensaje: "Usuario no existe",
                        error: err
                    });
            }
            req.usuario = usuarioDB
            next()
        })
}