const express = require("express");
const router = express.Router();

const checkRoles = role => (req, res, next) =>
  req.user && req.user.role === role
    ? next()
    : res.render("index", {
        msg: `Necesitas ser un ${role} para acceder aquí`
      });
router.get("/user", checkRoles("USER"), (req, res, next) =>
  res.render("roles/user")
);
router.get("/admin", checkRoles("ADMIN"), (req, res, next) =>
  res.render("roles/admin")
);
module.exports = router;
