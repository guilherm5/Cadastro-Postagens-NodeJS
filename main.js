//abrindo servidor e definindo porta 
const express = require('express');
const app = express();

//----------------------------------------------//
//definindo conexão com mysql 
const Sequelize = require ('sequelize')
const sequelize = new Sequelize('projeto_nodejs', 'guilherme', '123', {
    host: "localhost",
    dialect: 'mysql'
})
sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso")
}).catch(function(erro){
    console.log("Erro ao realiar conexão")
})

//----------------------------------------------//
//definindo tamplate engine
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


//----------------------------------------------//
//configurando body parser
const bodyParser = require('body-parser')
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//criando rotas 
app.get('/cad', function (req, res) {
    res.render('layouts/formulario');
});

app.post('/add', function (req, res) {
    res.send(`Texto: ${req.body.titulo} Conteudo: ${req.body.conteudo}`)
  });

//rodando servidor
app.listen(3000, function () {
    console.log('Servidor rodando na porta 3000!');
  });