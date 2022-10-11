let express = require("express");
let router = express.Router();
let database = require("../src/db");
let users = require("../src/users");

//GET Category
router.get("/getparentcategory", (req, res) => {
  let userid = req.body.userid;
  users.verifyAndActive(
    userid,
    req.header(process.env.HEADER_KEY),
    (err, re) => {
      if (err) return res.status(re).send({ error: true, message: err });

      database.query(
        `SELECT * FROM category WHERE isVisible = 1 && parent IS NULL`,
        (error, result, field) => {
          if (error) throw error;
          return res.send(result);
        }
      );
    }
  );
});

//GET child category
router.get("/getchildcategory", (req, res) => {
  let userid = req.body.userid;
  users.verifyAndActive(
    userid,
    req.header(process.env.HEADER_KEY),
    (err, re) => {
      if (err) return res.status(re).send({ error: true, message: err });
      let parentid = req.body.parentid;
      database.query(
        `SELECT * FROM category WHERE isVisible = 1 && parent = '${parentid}'`,
        (error, result, field) => {
          if (error) throw error;
          return res.send(result);
        }
      );
    }
  );
});

//GET Spent records
router.get("/getrecords", (req, res) => {
  let userid = req.body.userid;
  users.verifyAndActive(
    userid,
    req.header(process.env.HEADER_KEY),
    (err, re) => {
      if (err) return res.status(re).send({ error: true, message: err });

      database.query(
        `SELECT * FROM spentRecords WHERE userid = ${userid}`,
        (error, result, field) => {
          if (error) throw error;
          return res.send(result);
        }
      );
    }
  );
});

//POST add record
router.post("/addrecord", (req, res) => {
  let userid = req.body.userid;
  users.verifyAndActive(
    userid,
    req.header(process.env.HEADER_KEY),
    (err, re) => {
      if (err) return res.status(re).send({ error: true, message: err });
      let categoryId = req.body.categoryid;
      let spent = req.body.spent;
      let date = req.body.date;
      database.query(
        `INSERT INTO dailymonitracker.spentRecords (userId, categoryId, spent, date) VALUES ('${userid}', '${categoryId}', '${spent}', '${date}')`,
        (error, result, field) => {
          if (error) throw error;
          return res.send(result);
        }
      );
    }
  );
});

module.exports = router;
