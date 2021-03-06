// Passport //

// const GoogleStrategy = require("passport-google-oUser20").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt-nodejs");
const db = require("../models");
// const google = "GOOGLE";
const LocalStrategy = require('passport-local').Strategy;




// //Google//

// passport.use('google', new GoogleStrategy({
//   // options for google strategy
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_CALLBACK_URL
// },
//   // passport callback function
//   function (accessToken, refreshToken, profile, done) {
//     console.log(profile);
//     db.User.findOne({
//       where: { UserModeId: profile.id }
//     }).then(function (existingUser) {
//       if (existingUser) {

//         done(null, existingUser);
//       } else {
//         db.User.create({
//           firstName: profile.displayName,
//           avatar: profile.photos[0].value,
//           UserMode: google,
//           UserModeID: profile.id
//         }).then(function (user) {
//          done(null, user);
//         });
//       }

//     });
//   }
// ));

passport.use(new LocalStrategy(
  function (username, password, done) {

    db.User.findOne({
      where: {
        email: username
      }
    }).then((user) => {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        } else {
          done(null, false);
        }
      } else {
        done(null, null);
      }
    })
      .catch((err) => {
        console.log(err);
        done(null, null);

      })
  }

));


// Userenticate session persistence
passport.serializeUser(function (user, done) {
  done(null, user.id)
});

passport.deserializeUser(function (id, done) {
  console.log("deserial = " + id);
  db.User.findOne({
    where: {
      id: id
    }
  }).then(function (user) {
    console.log("deserial")
    done(null, user);
  });
});