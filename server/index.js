require("dotenv").config();
require("./controller/passport");

const express = require("express");
const passport = require("passport")
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const db = require("./models/");

const PORT = process.env.PORT || 5000;
app.use(express.static("client/build"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("./build"));
app.use(routes);

// if force = true, will drop the db every startup
var syncOptions = { force: false };

if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}
console.log("FORCE? " + syncOptions.force);
db.sequelize
  .sync(syncOptions)  
  .then(function() {
    app.listen(PORT, function() {
      console.log(`Listening on port ${PORT}`);
    });
  });
