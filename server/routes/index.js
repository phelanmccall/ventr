const path = require("path");
const router = require("express").Router();
const db = require("../models");


router.use(function (req, res, next) {
  var { path } = req;
  console.log("gatekeeper : " + path);
  switch (path) {
    case "/api/logout":
      break;
    case "/":
    case "/login":
    case "/api/user":
    case "/api/login":
    case "/auth/google":
    case "/auth/github":
    case "/auth/google/callback":
    case "/auth/github/callback":
      if (req.isAuthenticated()) {
        console.log("is already authenticated");
        res.redirect("/home");
      }
      break;
    default:
      if (!req.isAuthenticated()) {
        console.log("Gatekeeper says " + req.isAuthenticated());
        res.redirect("/login");
        break;
      }
      break;

  }
  next();
});
 
// If no API routes are hit, send the React app
router.use(function (req, res) {
  if (!res.headersSent) {
    res.sendFile(path.join(__dirname, "../../build/index.html"));
  }
});


module.exports = router;
