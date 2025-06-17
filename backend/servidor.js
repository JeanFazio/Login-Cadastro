const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando`);
});
