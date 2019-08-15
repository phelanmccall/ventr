const path = require("path");
const router = require("express").Router();
const db = require("../models");
const passport = require("passport");
const bcrypt = require("bcrypt-nodejs");

router.use(function (req, res, next) {
  var { path, method } = req;
  console.log("gatekeeper : " + method + " " + path);
  switch (path) {
    case "/logout":
      break;
    case "/":
    case "/login":
    case "/signup":
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

router.route("/logout")
  .get(function (req, res) {
    req.logout();
    res.redirect('/');
  });
router.route("/user")
  .get(function (req, res) {
    res.send(req.user);
  })

router.route("/user/:name")
  .get(function (req, res) {
    db.User.findOne({
      where: {
        username: req.params.name
      }
    }).then((dbUser)=>{
      res.send(dbUser);

    }).catch((err)=>{
      console.log(err);
      res.send(err);
    })
  })
router
  .route("/login")
  .post(passport.authenticate('local'), function (req, res) {
    console.log(req.user);
    res.send(req.user);
  });
// user routes
router.route("/signup")
  .post(function (req, res) {
    console.log()
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUser => {
      if (dbUser) {
        res.send("Email is taken.");
      } else {
       db.User.findOne({
         where: {
           username: req.body.username
         }
       }).then((dbUser2)=>{
         if(dbUser2){
           res.send("Username is taken.");
         }else{
          db.User.create({
            avatar: "https://via.placeholder.com/150x150",
            password: bcrypt.hashSync(req.body.password),
            username: req.body.username,
            email: req.body.email,
          }).then((dbUser) => {
            console.log(dbUser);
            res.send(dbUser);
          }).catch((err) => {
            console.log(err);
            res.send(err);
          });
         }
       })
      }
    });
  });

router.route("/block")
  .post(function (req, res) {
    db.Block.create({
      user1: req.user.id,
      user2: req.body.user
    }).then((dbBlock) => {
      res.send(dbBlock);
    }).catch((err) => {
      console.log(err);
      res.send(err);
    })
  })

router.route("/report")
  .get(function (req, res) {
    db.Report.find({

    }).then((dbReports) => {
      res.send(dbReports);
    }).catch((err) => {
      console.log(err);
      res.send(err);
    })
  })
  .post(function (req, res) {
    db.Report.create({
      post: req.body.post,
      reporter: req.user.id
    }).then((dbReport) => {
      res.send(dbReport);
    }).catch((err) => {
      console.log(err);

      res.send(err);
    })
  })

router.route("/friends")
  .get(function (req, res) {

  })
  .post(function (req, res) {
    db.Friend.create({
      user1: req.user.id,
      user2: req.body.user
    }).then((dbFriend) => {
      res.send(dbFriend);
    }).catch((err) => {
      console.log(err);

      res.send(err);
    })
  })
router.route("/:user/posts")
  .get(function(req, res){
    db.Post.findAll({
      where: {
        user: req.params.user
      }
    }).then((dbPosts)=>{
      res.send(dbPosts);
    }).catch((err)=>{
      console.log(err);
      res.send(err);
    })
  })

router.route("/posts")
  .get(function (req, res) {
    db.Friend.findAll({
      where: {
        status: "accepted" 
      },
      $or: [
        {user1: req.user.id},
        {user2: req.user.id}
      ]
    }).then((dbFriends)=>{
      console.log(dbFriends);
      let friendsList = dbFriends.map((val)=>{
        if(val.user1 === req.user.id){
          return val.user2;
        }else{
          return val.user1;
        }
      });
      db.Post.findAll({
        where:{
          user: friendsList,
          privacy: ["public", "friends"]
        }
      }).then((dbPosts)=>{
        res.send(dbPosts)
      }).catch((err)=>{
        console.log(err);
        res.send(err);
      })
    }).catch((err)=>{
      console.log(err);
      res.send(err);
    })
  })
  .post(function (req, res) {
    console.log(req.body);
    db.Post.create({
      user: req.user.email,
      body: req.body.post
    }).then((dbPost)=>{
      res.send("/home");
    }).catch((err)=>{
      console.log(err);
      res.send(err);
    })
  })
router.route("/update/password")
  .put(function(req, res){
    db.User.findOne({
      where:{
        id: req.user.id
      }
    }).then((dbUser)=>{
      if(bcrypt.compareSync(req.body.oldpass, dbUser.password)){
        db.User.update({
          password: bcrypt.hashSync(req.body.newpass)
        }) 
      }
    })
  })
router.route("/update/privacy")
  .put(function(req, res){
    db.Setting.update({
      privacy: req.body.privacy
    },
    {
      where: {
        user: req.user.username
      }
    }).catch((err)=>{
      console.log(err);
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
