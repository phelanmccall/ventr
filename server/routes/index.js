const path = require("path");
const router = require("express").Router();
const db = require("../models");
const passport = require("passport");


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

router
  .route("/login")
  .post(passport.authenticate('local'), function (req, res) {
    res.redirect("/home");
  });
// user routes
router.route("/signup")
  .post(function (req, res) {
    db.Users.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUser => {
      if (dbUser) {
        res.send("email is taken");
      } else {
        db.Users.create({
          avatar: "https://via.placeholder.com/150",
          password: bcrypt.hashSync(req.body.password),
          email: req.body.email,
        }).then(dbUser => {
          res.send(dbUser);
        });
      }
    });
  });

  router.route("/block")
    .post(function(req, res){
      db.Blocks.create({
        user1: req.user.id,
        user2: req.body.user
      }).then((dbBlock)=>{
        res.send(dbBlock);
      }).catch((err)=>{
        res.send(err);
      })
    })
    
router.route("/report")
    .get(function(req, res){
      db.Reports.find({

      }).then((dbReports)=>{
        res.send(dbReports);
      }).catch((err)=>{
        res.send(err);
      })
    })
    .post(function(req, res){
      db.Reports.create({
        post: req.body.post,
        reporter: req.user.id
      }).then((dbReport)=>{
        res.send(dbReport);
      }).catch((err)=>{
        res.send(err);
      })
    })
    
// If no API routes are hit, send the React app
router.use(function (req, res) {
  if (!res.headersSent) {
    res.sendFile(path.join(__dirname, "../../build/index.html"));
  }
});


module.exports = router;
