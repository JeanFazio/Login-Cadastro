const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const autenticarToken = require("../middleware/autenticarToken");

router.post("/login", authController.login);
router.post("/cadastro", authController.cadastro);
router.get("/verificar-email", authController.verificarEmail);
router.get("/perfil", autenticarToken, authController.perfil);

module.exports = router;