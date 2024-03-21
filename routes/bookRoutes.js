// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/dbconfig');

router.get('/', (req, res) => {
  const tipo = req.query.tipo || '';
  let sql = 'SELECT * FROM Livros';
  db.query(sql, (err, livros) => {
    if (err) {
      console.error('Erro ao buscar livros:', err);
      res.render('error', { message: 'Erro ao buscar livros.' });
      return;
    }
    res.render('index', { livros, tipo });
  });
});

router.get('/buscar', (req, res) => {
  const { tipo, titulo, ano } = req.query;
  if (tipo === 'titulo') {
    let sql = 'SELECT * FROM Livros WHERE titulo LIKE ?';
    db.query(sql, [`%${titulo}%`], (err, resultado) => {
      if (err) {
        console.error('Erro ao buscar livros por título:', err);
        res.render('error', { message: 'Erro ao buscar livros por título.' });
        return;
      }
      res.render('index', { livros: resultado, tipo: 'titulo' });
    });
  } else if (tipo === 'ano' && ano) {
    res.redirect(`/livros/buscar/ano/${ano}`);
  } else {
    res.redirect('/livros');
  }
});

router.get('/buscar/ano/:ano', (req, res) => {
  const { ano } = req.params;
  let sql = 'SELECT * FROM Livros WHERE ano = ?';
  db.query(sql, [ano], (err, resultado) => {
    if (err) {
      console.error('Erro ao buscar livros por ano:', err);
      res.render('error', { message: 'Erro ao buscar livros por ano.' });
      return;
    }
    res.render('index', { livros: resultado, tipo: 'ano' });
  });
});

module.exports = router;
