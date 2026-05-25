const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/carrosDB")
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log(err));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "segredo",
    resave: false,
    saveUninitialized: false
}));

const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");

app.use(authRoutes);
app.use(carRoutes);

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log("Servidor rodando");
});