const jwt = require("jsonwebtoken");
const UsuarioModel = require("../models/UsuarioModel");
const SECRET_KEY = "1072511537";

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await UsuarioModel.buscarPorEmailSenha(email, senha);
    if (user) {
      const token = jwt.sign(
        { id: user.id, nome: user.nome, email: user.email },
        SECRET_KEY,
        { expiresIn: "10h" }
      );
      res.status(200).json({ mensagem: "Login OK", token });
    } else {
      res.status(401).send("Email ou senha inválidos");
    }
  } catch (err) {
    res.status(500).send("Erro no servidor");
  }
};

exports.cadastro = async (req, res) => {
  const { nome, email, senha, confirmarSenha } = req.body;

  if (!senha || senha.length < 6) {
    return res.status(400).json({
      errors: {
        senha: "Senha deve ter pelo menos 6 caracteres."
      }
    });
  }

  if (senha !== confirmarSenha) {
    return res.status(400).json({
      errors: {
        confirmarSenha: "Senhas não coincidem."
      }
    });
  }
  try {
    const result = await UsuarioModel.criar(nome, email, senha);

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
};

exports.verificarEmail = async (req, res) => {
  const { email } = req.query;
  try {
    const result = await UsuarioModel.buscarPorEmail(email);
    
    if (result) {
      res.status(200).json({ disponivel: false, mensagem: "Email já cadastrado" });
    } else {
      res.status(200).json({ disponivel: true, mensagem: "Email disponível" });
    }
  } catch (err) {
    console.error("Erro ao verificar email:", err);
    res.status(500).send("Erro no servidor");
  }
};

exports.perfil = (req, res) => {
  res.json({ mensagem: "Você acessou uma rota protegida!", usuario: req.usuario });
};