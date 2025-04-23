const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); // agora usando o Pool do pg
const jwt = require("jsonwebtoken");

const SECRET_KEY = "1072511537"; // Chave secreta para assinar o token JWT
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send("Token não fornecido");

  jwt.verify(token, SECRET_KEY, (err, usuario) => {
    if (err) return res.status(403).send("Token inválido ou expirado");
    req.usuario = usuario;
    next();
  });
}

app.get("/perfil", autenticarToken, (req, res) => {
  res.json({ mensagem: "Você acessou uma rota protegida!", usuario: req.usuario });
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  
  try {
    const result = await db.query("SELECT * FROM usuarios WHERE email = $1 AND senha = $2", [email, senha]);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      const token = jwt.sign(
        { id: user.id, nome: user.nome, email: user.email },
        SECRET_KEY,
        { expiresIn: "10m" }
      );

      res.status(200).json({ mensagem: "Login OK", token });
    } else {
      res.status(401).send("Email ou senha inválidos");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});

app.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  console.log("Tentativa de cadastro com:", { nome, email, senha });

  try {
    const result = await db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)",
      [nome, email, senha]
    );

    console.log("Usuário cadastrado com sucesso:", result);
    res.status(201).send("Usuário cadastrado com sucesso");
  } catch (err) {
    console.error("Erro ao tentar cadastrar usuário:", err);

    if (err.code === "23505") {
      console.log("Email já cadastrado:", email);
      return res.status(409).send("Email já cadastrado");
    }

    res.status(500).send("Erro no cadastro");
  }
});

app.get("/verificar-email", async (req, res) => {
  const { email } = req.query;

  try {
    const result = await db.query("SELECT * FROM usuarios WHERE email = $1", [email]);

    if (result.rows.length > 0) {
      res.status(200).json({ disponivel: false, mensagem: "Email já cadastrado" });
    } else {
      res.status(200).json({ disponivel: true, mensagem: "Email disponível" });
    }
  } catch (err) {
    console.error("Erro ao verificar email:", err);
    res.status(500).send("Erro no servidor");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});