const pg = require('pg');

const conexao = new pg.Client({
  connectionString: "postgresql://jean:jAXTJ4CowRPCpB5HmpxZdA@blackzssj-1696.jxf.gcp-southamerica-east1.cockroachlabs.cloud:26257/postgres?sslmode=verify-full",
  ssl: {
    rejectUnauthorized: false
  }
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