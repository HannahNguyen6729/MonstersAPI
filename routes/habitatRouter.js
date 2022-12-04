const { Router } = require("express");
const router = Router();
const pool = require("../db/db");

router.get("/", (request, response) => {
  pool.query("SELECT * FROM habitats ORDER BY id ASC", (err, res) => {
    if (err) return console.log(err);
    response.json(res.rows);
  });
});

router.post("/", (request, response) => {
  const { name, climate, temperature } = request.body;
  pool.query(
    "INSERT INTO habitats(name, climate, temperature) VALUES($1, $2, $3)",
    [name, climate, temperature],
    (err, res) => {
      if (err) return console.log(err);
      response.redirect("/api/v1/habitats");
    }
  );
});
module.exports = router;
