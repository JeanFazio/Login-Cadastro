const db = require("../db");

const UsuarioModel = {
  async buscarPorEmail(email) {
    const result = await db.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    return result.rows[0];
  },

  async buscarPorEmailSenha(email, senha) {
    const result = await db.query("SELECT * FROM usuarios WHERE email = $1 AND senha = $2", [email, senha]);
    return result.rows[0];
  },

  async criar(nome, email, senha) {
    return db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)",
      [nome, email, senha]
    );
  },

  async atualizarPerfil(id, nome, email) {
    return db.query(
      "UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3",
      [nome, email, id]
    );
  },
};

module.exports = UsuarioModel;