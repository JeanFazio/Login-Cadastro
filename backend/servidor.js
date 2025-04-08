const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// LOGIN
app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
  db.query(sql, [email, senha], (err, results) => {
    if (err) return res.status(500).send("Erro no servidor");
    if (results.length > 0) return res.status(200).send("Login OK");
    else return res.status(401).send("Email ou senha inválidos");
  });
});

// CADASTRO
app.post("/cadastro", (req, res) => {
  const { nome, email, senha } = req.body;
  const sql = "INSERT INTO usuarios (nome ,email, senha) VALUES (?, ?)";
  db.query(sql, [nome, email, senha], (err, results) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).send("Email já cadastrado");
      }
      return res.status(500).send("Erro no cadastro");
    }
    return res.status(201).send("Usuário cadastrado com sucesso");
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
