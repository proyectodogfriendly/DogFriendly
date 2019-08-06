const express = require("express");
const router = express.Router();
const Place = require("../models/Places");
const Area = require("../models/Areas");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/api/places", (req, res, next) => {
  Place.find({})
    .then(places => {
      places.data;
      // console.log(places)
      res.json(places);
    })
    .catch(err => console.log(err));
});

router.get("/api/areas", (req, res, next) => {
  Area.find({})
    .then(areas => {
      // area.data;
      // console.log(areas);
      res.json(areas);
    })
    .catch(err => console.log(err));
});

module.exports = router;
