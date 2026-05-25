const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nome: String,
    login: String,
    senha: String
});

module.exports = mongoose.model("User", UserSchema);