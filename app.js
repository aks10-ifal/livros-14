const express = require('express');
const bookRoutes = require('./routes/bookRoutes');

const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));

// Defina o uso das rotas do livro
app.use('/livros', bookRoutes);

// Middleware para redirecionar a rota raiz para '/livros'
app.get('/', (req, res) => {
  res.redirect('/livros');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor Rodando na Porta: ${port}`))
