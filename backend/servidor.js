const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "1072511537";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer token"

  if (!token) return res.status(401).send("Token não fornecido");

  jwt.verify(token, SECRET_KEY, (err, usuario) => {
    if (err) return res.status(403).send("Token inválido ou expirado");
    req.usuario = usuario; // Salva os dados do usuário decodificado no request
    console.log(usuario);
    console.log("Token decodificado:", usuario); 
    next();
  });
}

app.get("/perfil", autenticarToken, (req, res) => {
  res.json({ mensagem: "Você acessou uma rota protegida!", usuario: req.usuario });
});


app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";

  db.query(sql, [email, senha], (err, results) => {
    if (err) return res.status(500).send("Erro no servidor");
    if (results.length > 0) {
      const user = results[0];

      // Criar token com dados do usuário
      const token = jwt.sign(
        { id: user.id, nome: user.nome, email: user.email },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      return res.status(200).json({ mensagem: "Login OK", token });
    } else {
      return res.status(401).send("Email ou senha inválidos");
    }
  });
});

app.post("/cadastro", (req, res) => {
  const { nome, email, senha } = req.body;
  const sql = "INSERT INTO usuarios (nome ,email, senha) VALUES (?, ?, ?)";
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
