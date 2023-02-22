//abrindo servidor e definindo porta 
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const Post = require('./models/Post');
const { where } = require('sequelize');

//----------------------------------------------//
//definindo tamplate engine

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,

        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');


//----------------------------------------------//
//configurando body parser

app.use(express.urlencoded({extended:false}))
app.use(express.json())

//criando rotas 

app.get('/', function(req,res){
    Post.findAll({order:[['id', 'DESC']]}).then(function(posts){
        res.render('layouts/home', {posts: posts})
    })
   
})

app.get('/cad', function (req, res) {
    res.render('layouts/formulario');
});

app.post('/add', function (req, res) {

    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.redirect('/')
    }).catch(function(erro){
        res.send("Erro ao criar post: " + erro)
    })

  });

app.get('/deletar/:id', function(req, res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
        res.send("Postagem deletada com sucesso")
    }).catch(function(erro){
        res.send("Essa postagem nao existe")
    })
})



app.get('/edit/:id', function(req, res){
  Post.findByPk(req.params.id)
    .then(post => {
      res.render('layouts/form-edit', {
        id: req.params.id,
        titulo: post.titulo,
        conteudo: post.conteudo
      })
    })
    .catch(err => {
      res.send('Post não encontrado!')
    })
})
app.post('/editado/:id', function(req, res){
  Post.update({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo
  },
  {
    where: { id: req.params.id }
  }).then(function(){
    res.redirect('/')
  }).catch(function(err){
    console.log(err);
  })
})

//rodando servidor
app.listen(3000, function () {
    console.log('Servidor rodando na porta 3000!');
  });
