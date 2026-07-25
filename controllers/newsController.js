const db = require("../database/database");

// Mostrar formulário de nova notícia
exports.showNewForm = (req, res) => {
    
// Guardar nova notícia
exports.createNews = (req, res) => {

    const { titulo, categoria, imagem, conteudo } = req.body;

    const autor = req.session.user.nome;

    db.run(
        `INSERT INTO news
        (titulo, categoria, imagem, conteudo, autor)
        VALUES (?, ?, ?, ?, ?)`,
        [titulo, categoria, imagem, conteudo, autor],
        function(err){

            if(err){

                console.log(err);

                return res.send("Erro ao publicar notícia.");

            }

            res.redirect("/noticias");

        }
    );

};

    res.render("nova-noticia");

};