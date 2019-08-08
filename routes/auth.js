const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth/user",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/user", (req, res, next) => {
  console.log(req.user)
  if(req.user && req.user.role ==="ADMIN"){
    res.render("roles/admin");
  }
  else{
    res.render("roles/user");
  }
});



router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});
router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  const nameDog = req.body.nameDog;
  const ageDog = req.body.ageDog;
  if (
    username === "" ||
    surname === "" ||
    email === "" ||
    password === "" ||
    nameDog === "" ||
    ageDog === ""
  ) {
    res.render("auth/signup", {
      message: "Rellena todos los campos, por favor"
    });
    return;
  }
  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "El nombre de usuario ya existe" });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      surname,
      email,
      password: hashPass,
      nameDog,
      ageDog
    });
    newUser
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      });
  });
});
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
module.exports = router;
