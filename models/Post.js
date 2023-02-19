const db = require('./DB')

const Post = db.sequelize.define('postagens', {
    titulo: {
        type: db.Sequelize.TEXT
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
})




module.exports = Post