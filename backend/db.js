const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "F9s8Wi9.W$zXX!L",
  database: "login_react"
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar com o banco:", err);
  } else {
    console.log("Conectado ao MySQL!");
  }
});

module.exports = db;
