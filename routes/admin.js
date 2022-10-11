let express = require("express");
let router = express.Router();
let database = require("../src/db");
let users = require("../src/users");

//GET Category
router.get("/getparentcategory", (req, res) => {
  let userid = req.body.userid;
  users.verifyAndAdmin(
    userid,
    req.header(process.env.HEADER_KEY),
    (err, re) => {
      if (err) return res.status(re).send({ error: true, message: err });

      database.query(
        `SELECT * FROM category WHERE parent IS NULL`,
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
  users.verifyAndAdmin(
    userid,
    req.header(process.env.HEADER_KEY),
    (err, re) => {
      if (err) return res.status(re).send({ error: true, message: err });
      let parentid = req.body.parentid;
      database.query(
        `SELECT * FROM category WHERE parent = '${parentid}'`,
        (error, result, field) => {
          if (error) throw error;
          return res.send(result);
        }
      );
    }
  );
});

//GET users
router.get("/getusers", (req, res) => {
  let userid = req.body.userid;
  users.verifyAndAdmin(
    userid,
    req.header(process.env.HEADER_KEY),
    (err, re) => {
      if (err) return res.status(re).send({ error: true, message: err });
      database.query(`SELECT * FROM users`, (error, result, field) => {
        if (error) throw error;
        return res.send(result);
      });
    }
  );
});

//POST update user status
router.post("/updateuser", (req, res) => {
  let userid = req.body.userid;
  let targetid = req.body.targetid;
  let status = req.body.status;
  if (!targetid || !status || !userid)
    return res
      .status(400)
      .send({ error: true, message: "Missing information!" });
  users.verifyAndAdmin(
    userid,
    req.header(process.env.HEADER_KEY),
    (err, re) => {
      if (err) return res.status(re).send({ error: true, message: err });
      database.query(
        `UPDATE dailymonitracker.users SET active = '${status}' WHERE (id = '${targetid}')`,
        (error, result, field) => {
          if (error) throw error;
          return res.send(result);
        }
      );
    }
  );
});

//POST update category info
router.post("/updatecategory", (req, res) => {
  let userid = req.body.userid;
  let id = req.body.id;
  let isVisible = req.body.isVisible;
  let name = req.body.name;
  let icon = req.body.icon;
  let src = req.body.src;
  if (!id || !isVisible || !userid || !name || !icon || !src)
    return res
      .status(400)
      .send({ error: true, message: "Missing information!" });
  users.verifyAndAdmin(
    userid,
    req.header(process.env.HEADER_KEY),
    (err, re) => {
      if (err) return res.status(re).send({ error: true, message: err });
      database.query(
        `UPDATE dailymonitracker.category SET name = '${name}', icon = '${icon}', src = '${src}', isVisible = '${isVisible}' WHERE (id = '${id}')`,
        (error, result, field) => {
          if (error) throw error;
          return res.send(result);
        }
      );
    }
  );
});

//POST add category
router.post("/addcategory", (req, res) => {
  let userid = req.body.userid;
  let id = req.body.id;
  let isVisible = req.body.isVisible;
  let name = req.body.name;
  let icon = req.body.icon;
  let src = req.body.src;
  let parent = req.body.parent;
  if (!id || !isVisible || !userid || !name || !icon || !src)
    return res
      .status(400)
      .send({ error: true, message: "Missing information!" });
  users.verifyAndAdmin(
    userid,
    req.header(process.env.HEADER_KEY),
    (err, re) => {
      if (err) return res.status(re).send({ error: true, message: err });
      database.query(
        `INSERT INTO dailymonitracker.category (parent, name, icon, src, isVisible) VALUES ( '${parent}', '${name}', '${icon}', '${src}', '${isVisible}')`,
        (error, result, field) => {
          if (error) throw error;
          return res.send(result);
        }
      );
    }
  );
});

//DELETE category
router.delete("/deletecategory", (req, res) => {
  let userid = req.body.userid;
  let targetid = req.body.targetid;
  if (!userid || !targetid)
    return res
      .status(400)
      .send({ error: true, message: "Missing information!" });
  users.verifyAndAdmin(
    userid,
    req.header(process.env.HEADER_KEY),
    (err, re) => {
      if (err) return res.status(re).send({ error: true, message: err });
      database.query(
        `DELETE FROM dailymonitracker.category WHERE (id = '${targetid}')`,
        (error, result, field) => {
          if (error) throw error;
          return res.send(result);
        }
      );
    }
  );
});

module.exports = router;
