const express = require("express");

const router = express.Router();

const Car = require("../models/Car");

function auth(req, res, next) {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
}

router.get("/cars", auth, async (req, res) => {

    const cars = await Car.find();

    res.render("cars", { cars });
});

router.get("/manage", auth, async (req, res) => {

    const cars = await Car.find();

    res.render("manageCars", { cars });
});

router.get("/create", auth, (req, res) => {
    res.render("createCar");
});

router.post("/cars/create", auth, async (req, res) => {

    const { marca, modelo, ano, qtde_disponivel } = req.body;

    await Car.create({
        marca,
        modelo,
        ano,
        qtde_disponivel
    });

    res.redirect("/manage");
});

router.get("/edit/:id", auth, async (req, res) => {

    const car = await Car.findById(req.params.id);

    res.render("editCar", { car });
});

router.post("/cars/update/:id", auth, async (req, res) => {

    await Car.findByIdAndUpdate(req.params.id, req.body);

    res.redirect("/manage");
});

router.get("/cars/delete/:id", auth, async (req, res) => {

    await Car.findByIdAndDelete(req.params.id);

    res.redirect("/manage");
});

router.get("/cars/sell/:id", auth, async (req, res) => {

    const car = await Car.findById(req.params.id);

    if (car.qtde_disponivel > 0) {

        car.qtde_disponivel -= 1;

        await car.save();
    }

    res.redirect("/cars");
});

module.exports = router;