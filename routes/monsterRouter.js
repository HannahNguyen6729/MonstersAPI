const { Router } = require("express");
const router = Router();
const pool = require("../db/db");

//get all monsters
router.get("/", (request, response) => {
  pool.query("SELECT * FROM monsters ORDER BY id ASC", (err, res) => {
    if (err) return console.log(err);
    //console.log(res.rows);
    response.json(res.rows);
  });
});
//get by id
router.get("/:id", (request, response) => {
  const id = request.params.id;
  pool.query(`SELECT * FROM monsters WHERE id = $1`, [id], (err, res) => {
    if (err) return console.log(err);
    response.json(res.rows);
  });
});
//post
router.post("/", (request, response) => {
  const { name, personality } = request.body;
  pool.query(
    "INSERT INTO monsters (name, personality) VALUES ($1, $2)",
    [name, personality],
    (err, res) => {
      if (err) return console.log(err);
      response.redirect("/api/v1/monster");
    }
  );
});
//delete
router.delete("/:id", (request, response) => {
  const { id } = request.params;
  pool.query("DELETE FROM monsters WHERE id = $1", [id], (err, res) => {
    if (err) return console.log(err);
    response.redirect("/api/v1/monster");
  });
});

//update
router.put("/:id", (request, response) => {
  const { id } = request.params;
  const { name, personality } = request.body;
  const keys = ["name", "personality"];
  const fields = [];

  keys.forEach((key) => {
    if (request.body[key]) {
      fields.push(key);
    }
  });

  fields.forEach((item, index) => {
    pool.query(
      `UPDATE monsters SET ${item} = ($1) WHERE id = ($2)`,
      [request.body[item], id],
      (err, res) => {
        if (err) return console.log(err);
        if (index === fields.length - 1) response.redirect("/api/v1/monster");
      }
    );
  });
});
// router.put("/:id", async (request, response) => {
//   const { id } = request.params;
//   const { name, personality } = request.body;

//   pool.query(
//     "UPDATE monsters SET name=($1), personality=($2) WHERE id=($3)",
//     [name, personality, id],
//     (err, res) => {
//       if (err) return console.log(err);
//       response.redirect("/api/v1/monster");
//     }
//   );
// });
module.exports = router;
