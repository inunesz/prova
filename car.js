const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    marca: String,
    modelo: String,
    ano: Number,
    qtde_disponivel: Number
});

module.exports = mongoose.model("Car", CarSchema);