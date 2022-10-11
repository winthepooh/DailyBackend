let express = require("express");
let router = express.Router();
let database = require("../src/db");

router.get("/:user", (req, res) => {
  let user = req.params.user;
  if (!user)
    return res.status(400).send({
      error: true,
      message: "Please enter something!",
    });

  database.query(
    `SELECT * FROM users WHERE username = '${user}'`,
    (error, result, field) => {
      if (error) throw error;
      if (result.length == 0) {
        return res.send({
          error: false,
          message: "Username avaliable!",
        });
      } else {
        return res.status(400).send({
          error: true,
          message: "Username unavaliable!",
        });
      }
    }
  );
});

module.exports = router;
