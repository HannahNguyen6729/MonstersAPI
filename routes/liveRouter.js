const { Router } = require("express");
const router = Router();
const pool = require("../db/db");

router.get("/", (request, response) => {
  pool.query("SELECT * FROM live", (err, res) => {
    if (err) return console.log(err);
    response.json(res.rows);
  });
});

router.get("/conditions", (request, response) => {
  pool.query(
    "SELECT * FROM live JOIN habitats ON habitats.name = live.habitat",
    (err, res) => {
      if (err) return console.log(err);
      response.json(res.rows);
    }
  );
});
module.exports = router;
