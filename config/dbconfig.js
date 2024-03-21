//config/dbConfig
const mysql = require('mysql');

const dbConfig = {
  host: "database-14.mysql.database.azure.com",
  user: "kaua",
  password: "Augusto777#",
  database: "livraria",
  port: 3306,
  ssl: {
    mode: 'require'
  }
};

const conn = mysql.createConnection(dbConfig);

conn.connect((err) => {
  if (err) throw err;
  console.log('Conexão com o banco de dados MySQL estabelecida.');
});

module.exports = conn;
