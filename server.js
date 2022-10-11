let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let denv = require("dotenv");

denv.config();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//*****ROUTES*******

//Check username
let checkuser = require("./routes/checkuser");
app.use("/checkuser", checkuser);

//Register
let register = require("./routes/register");
app.use("/register", register);

//Login
let login = require("./routes/login");
app.use("/login", login);

//User
let user = require("./routes/user");
app.use("/user", user);

//Admin
let admin = require("./routes/admin");
app.use("/admin", admin);

/////////////////////////////////////////////
let port = 5000 | process.env.PORT;
app.listen(port, () => {
  console.log("Listening on port " + port);
});

module.exports = app;
