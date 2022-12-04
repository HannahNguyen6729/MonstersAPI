const express = require("express");
const app = express();
const cors = require("cors");
const monsterRouter = require("./routes/monsterRouter");
const habitatRouter = require("./routes/habitatRouter");
const liveRouter = require("./routes/liveRouter");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES
app.use("/api/v1/monster", monsterRouter);
app.use("/api/v1/habitats", habitatRouter);
app.use("/api/v1/lives", liveRouter);

app.listen(3000, () => {
  console.log("server has started on port 3000");
});
