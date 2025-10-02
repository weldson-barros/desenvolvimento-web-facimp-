// userRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("./UserControllers");

router.get("/users", controller.listarUsuarios);
router.post("/users", controller.criarUsuario);
router.put("/users/:id", controller.atualizarUsuario);
router.delete("/users/:id", controller.deletarUsuario);

module.exports = router;
