var mongoose = require('mongoose');
var connect = require('../connect/mongoConnect');

var Schema = mongoose.Schema;

var UsuarioSchema  = new Schema({
    nome: String,
    login: String,
    senha: String,
});

module.exports = connect.model('Usuario', UsuarioSchema);