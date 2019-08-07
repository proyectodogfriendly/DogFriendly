const express = require("express");
const router = express.Router();
const Place = require("../models/Places");
const Area = require("../models/Areas");

/* GET home page */
router.get("/", (req, res, next) => {
  // promise1 recibe datos de los places filtrados por distritos
  const promise1 = Place.find()
    .then(places => {
      let uniquePlaces = [];
      places.forEach(place => {
        if (!uniquePlaces.includes(place.district)) {
          uniquePlaces.push(place.district);
        }
      });
      return uniquePlaces;
    })
    .catch(err => console.log(err));

  // promise2 recibe datos de las areas filtradas por distritos
  const promise2 = Area.find()
    .then(areas => {
      let uniqueAreas = [];
      areas.forEach(area => {
        if (!uniqueAreas.includes(area.district)) {
          uniqueAreas.push(area.district);
        }
      });

      return uniqueAreas;
    })
    .catch(err => console.log(err));

  //-------//
  const promises = [promise1, promise2];
  //promise all
  Promise.all(promises)
    .then(results => {
      let places = results[0];
      let areas = results[1];
      res.render("index", { places, areas });
    })
    .catch(err => console.log(err));
});

//Busca datos de lugares para pasarlos como json a google maps
router.get("/api/places", (req, res, next) => {
  Place.find({})
    .then(places => {
      //places.data;
      // console.log(places)
      res.json(places);
    })
    .catch(err => console.log(err));
});

//Busca datos de areas para pasarlos como json a google maps
router.get("/api/areas", (req, res, next) => {
  Area.find({})
    .then(areas => {
      // area.data;
      // console.log(areas);
      res.json(areas);
    })
    .catch(err => console.log(err));
});

//Petición datos districts para pasarlos como json a google maps

router.get("/api/district", (req, res, next) => {
  const district = req.query.barrio;
  // const place = []
  Place.find({ district: district })
    .then(places => {
      console.log(places);

      res.json(places);
    })
    .catch(err => console.log(err));
});

router.get("/api/districta", (req, res, next) => {
  const district = req.query.area;
  Area.find({ district: district })
    .then(districts => {
      console.log(districts);

      res.json(districts);
    })
    .catch(err => console.log(err));
});

module.exports = router;
