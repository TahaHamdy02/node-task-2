const express = require("express");
const connectionToDatabase = require("./src/config/dbConnection");
const routes = require("./src/routes/routes");
require("dotenv").config();
const app = express();

app.use(express.json());
//Route
app.use("/api", routes);
//db connection
connectionToDatabase();
// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
