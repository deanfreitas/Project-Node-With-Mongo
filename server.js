var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var Usuario = require('./api/mongo/model/usuarioModel');
var connect = require('./api/mongo/connect/mongoConnect');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

router.use(function (req, res, next) {
    console.log('');
    next();
});

router.get('/', function (req, res) {
    res.json({message: 'Hello World'});
});

router.route('/usuarios')
    .post(function (req, res) {
        var usuario = new Usuario();
        usuario.nome = req.body.nome;
        usuario.login = req.body.login;
        usuario.senha = req.body.senha;

        usuario.save(function (error) {
            if (error)
                res.send(error);

            res.json({message: 'Usuario criado!'});
        });
    })

    .get(function (req, res) {
        Usuario.find(function (err, usuarios) {
            if (err)
                res.send(err);

            res.json(usuarios);
        });
    });

router.route('/usuarios/:usuario_id')
    .get(function (req, res) {
        Usuario.findById(req.params.usuario_id, function (error, usuario) {
            if (error)
                res.send(error);

            res.json(usuario);
        });
    })
    .put(function (req, res) {
        Usuario.findById(req.params.usuario_id, function (error, usuario) {
            if (error)
                res.send(error);

            usuario.nome = req.body.nome;
            usuario.login = req.body.login;
            usuario.senha = req.body.senha;

            usuario.save(function (error) {
                if (error)
                    res.send(error);

                res.json({message: 'Usuario Atualizado!'});
            });
        });
    })
    .delete(function (req, res) {
        Usuario.remove({_id: req.params.usuario_id}, function (error) {
            if (error)
                res.send(error);

            res.json({message: 'Usuário excluído com Sucesso!'});
        });
    });


app.use('/api', router);
app.listen(port);

console.log('Iniciando na porta ' + port);