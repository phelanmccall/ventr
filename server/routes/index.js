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
router.route("/char")
  .get(function(req, res) {
    db.Char.findOne({
      where: {
        name: req.user.username
      }
    }).then((dbChar)=>{
      console.log(dbChar);
      res.send(dbChar);
    }).catch((err)=>{
      console.log(err);
      res.send(err);
    })
  })
  .post(function(req, res) {
    console.log(req.body);
    let {str, def, agi, wis, luk, avatar} = req.body;
    let check = str + def + agi + wis + luk > 35;
    if(check){
      res.send("UH OH SPAGHETTI-O");
    }else{
      db.Char.create({
        name: req.user.username,
        str,
        def,
        agi,
        wis,
        luk,
        avatar
      })
    }
    
  })

router.route("/user/:name")
  .get(function (req, res) {
    db.User.findOne({
      where: {
        username: req.params.name
      }
    }).then((dbUser) => {
      res.send(dbUser);

    }).catch((err) => {
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
        }).then((dbUser2) => {
          if (dbUser2) {
            res.send("Username is taken.");
          } else {
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

router.route("/report")
  .get(function (req, res) {
    db.Report.findAll({

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

router.route("/follows")
  .get(function (req, res) {

  })
  .post(function (req, res) {
    db.Follow.create({
      user1: req.user.id,
      user2: req.body.user
    }).then((dbFollow) => {
      res.send(dbFollow);
    }).catch((err) => {
      console.log(err);

      res.send(err);
    })
  })

router.route("/:user/posts")
  .get(function (req, res) {
    db.Post.findAll({
      where: {
        user: req.params.user
      }
    }).then((dbPosts) => {
      res.send(dbPosts);
    }).catch((err) => {
      console.log(err);
      res.send(err);
    })
  })

router.route("/:user/posts/:id")
  .get(function (req, res) {
    db.Post.findOne({
      where: {
        user: req.user.username,
        id: req.params.id
      }
    }).then((dbPost) => {
      res.send(dbPost);
    }).catch((err) => {
      console.log(err);
      res.send(err);
    })
  })

router.route("/posts/:id")
  .get(function (req, res) {
    db.Post.findOne({
      where: {
        user: req.user.username,
        id: req.params.id
      }
    }).then((dbPost) => {
      res.send(dbPost);
    }).catch((err) => {
      console.log(err);
      res.send(err);
    })
  })
  .delete(function (req, res) {
    db.Post.destroy({
      where: {
        user: [req.user.email, req.user.username],
        id: req.params.id
      }
    }).then((dbPost) => {
      console.log(dbPost);
      res.send({
        deleted: dbPost
      })
    }).catch((err) => {
      console.log(err);
      res.send(err);
    })
  })

router.route("/like")
  .post(function(req, res){
    console.log(req.body);
      db.Like.findOne({
       where: {
        user: req.user.username,
        post: req.body.post
       }
      }).then((dbLike)=>{
        console.log(dbLike)
        if(dbLike){
          db.Like.destroy({
            where: {
              user: req.user.username,
              post: req.body.post
             }
          }).then((deleted)=>{
            db.Post.decrement(
              "score",
              {
              where: {
                id: req.body.post
              }
            }).then((row)=>{
              console.log(row);
              res.send({
                deleted: deleted
              });
            })
          }).catch((err)=>{
            console.log(err);
            res.send(err);
          })
        }else{
          db.Like.create({
            user: req.user.username,
            post: req.body.post
          }).then((dbLike2)=>{
            console.log(dbLike2);
            db.Post.increment("score",
            {where:{
              id: req.body.post
            }}).then((rows)=>{
              res.send({
                affected: rows
              });
            })
          }).catch((err)=>{
            console.log(err);
            res.send(err);
          })
        }
      }).catch((err)=>{
        console.log(err);
        res.send(err);
      })
  })

router.route("/everypost")
  .get(function (req, res) {
    db.Post.findAll({
      order: [['createdAt', 'DESC']]
    }).then((dbPosts) => {
      res.send(dbPosts);
    }).catch((err) => {
      console.log(err);
      res.send(err);
    })
  })
  

router.route("/posts")
  .get(function (req, res) {
    db.Post.findAll({
      order: [ ['createdAt', 'DESC'] ],
      where: {
        user: [req.user.username, req.user.email]
      }
    }).then((dbPosts) => {
      res.send(dbPosts);
    }).catch((err) => {
      console.log(err);
      res.send(err);
    })
  })
  .post(function (req, res) {
    console.log(req.body);
    db.Post.create({
      user: req.user.username,
      body: req.body.body,
    }).then((dbPost) => {
      res.send(dbPost);
    }).catch((err) => {
      console.log(err);
      res.send(err);
    })
  })

router.route("/update/password")
  .put(function (req, res) {
    db.User.findOne({
      where: {
        id: req.user.id
      }
    }).then((dbUser) => {
      if (bcrypt.compareSync(req.body.oldpass, dbUser.password)) {
        db.User.update({
          password: bcrypt.hashSync(req.body.newpass)
        })
      }
    })
  })



// If no API routes are hit, send the React app
router.use(function (req, res) {
  if (!res.headersSent) {
    res.sendFile(path.join(__dirname, "../../build/index.html"));
  }
});


module.exports = router;
