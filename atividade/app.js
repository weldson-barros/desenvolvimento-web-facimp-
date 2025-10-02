// app.js
const express = require("express");
require("dotenv").config();
const routes = require("./userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
