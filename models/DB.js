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



module.exports = {
    Sequelize: Sequelize, 
    sequelize: sequelize
}