const express = require("express");
const router = express.Router();
const Area = require("../models/Areas");
const Place = require("../models/Places");

router.get("/new", (req, res, next) => {
  // console.log(" enlaza con la vista nuevo parque")
  res.render("listados/new");
});

router.post("/new", (req, res, next) => {
  console.log("empieza a crear restaurantes");
  const { position, name, address, district, description } = req.body;
  console.log("empieza a crear");
  Place.create({ position, name, address, district, description })
    .then(theNewPlace => console.log(theNewPlace))
    .catch(err => console.log(err));
});

//nueva ruta para hacer el listado de restaurantes

router.get("/listados", (req, res, next) => {
  Place.find({})
    .then(allThePlaces =>
      res.render("listados/listadorestaurantes", { places: allThePlaces })
    )
    .catch(err => console.log("Hubo un error:", err));
});

router.get("/listas", (req, res, next) => {
  Area.find({})
    .then(allTheAreas =>
      res.render("listados/listadoareas", { areas: allTheAreas })
    )
    .catch(err => console.log("Hubo un error:", err));
});

module.exports = router;
