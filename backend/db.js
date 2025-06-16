const pg = require("pg");
require("dotenv").config();

const conexao = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

conexao.connect()
  .then(() => console.log("Banco de dados conectado com sucesso!"))
  .catch((erro) => console.error("Erro ao conectar ao banco de dados:", erro));

module.exports = conexao;


// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "jean",
//   host: "blackzssj-1696.jxf.gcp-southamerica-east1.cockroachlabs.cloud",
//   database: "postgres",
//   password: "jAXTJ4CowRPCpB5HmpxZdA",
//   port: 26257,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// pool.connect()
//   .then(() => console.log("Banco de dados conectado com sucesso!"))
//   .catch((erro) => console.error("Erro ao conectar ao banco de dados:", erro));

// module.exports = pool;