const db = require("../database/database");

// =======================
// Formulário Nova Notícia
// =======================

exports.showNewForm = (req, res) => {

    res.render("nova-noticia");

};

// =======================
// Criar Notícia
// =======================

exports.createNews = (req, res) => {

    const { titulo, categoria, imagem, conteudo } = req.body;

    if (!req.session.user) {
    return res.redirect("/login");

}

    const autor = req.session.user.nome;

    db.run(

        `INSERT INTO news
        (titulo, categoria, imagem, conteudo, autor)
        VALUES (?, ?, ?, ?, ?)`,

        [
            titulo,
            categoria,
            imagem,
            conteudo,
            autor
        ],

        function (err) {

            if (err) {

                console.log(err);

                return res.send("Erro ao publicar notícia.");

            }

            res.redirect("/admin/noticias");

        }

    );

};

// =======================
// Listar Notícias (Público)
// =======================

exports.listNews = (req, res) => {

    db.all(

        "SELECT * FROM news ORDER BY id DESC",

        [],

        (err, noticias) => {

            if (err) {

                console.log(err);

                return res.send("Erro ao carregar notícias.");

            }

            noticias.forEach(noticia => {

                noticia.data = new Date(
                    noticia.created_at
                ).toLocaleDateString("pt-PT", {

                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"

                });

            });

            res.render("noticias", {
                noticias
            });

        }

    );

};

// =======================
// Mostrar Notícia
// =======================

exports.showNews = (req, res) => {

    const id = req.params.id;

    db.get(

        "SELECT * FROM news WHERE id = ?",

        [id],

        (err, noticia) => {

            if (err) {

                console.log(err);

                return res.send("Erro ao carregar notícia.");

            }

            if (!noticia) {

                return res.send("Notícia não encontrada.");

            }

            noticia.data = new Date(
                noticia.created_at
            ).toLocaleDateString("pt-PT", {

                day: "2-digit",
                month: "2-digit",
                year: "numeric"

            });

            res.render("noticia", {
                noticia
            });

        }

    );

};

// =======================
// Painel Admin
// =======================

exports.adminNews = (req, res) => {

    db.all(

        "SELECT * FROM news ORDER BY id DESC",

        [],

        (err, noticias) => {

            if (err) {

                console.log(err);

                return res.send("Erro ao carregar notícias.");

            }

            noticias.forEach(noticia => {

                noticia.data = new Date(
                    noticia.created_at
                ).toLocaleDateString("pt-PT", {

                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"

                });

            });

            res.render("admin-noticias", {
                noticias,
                user: req.session.user
            });

        }

    );

};

// =======================
// Formulário Editar
// =======================

exports.showEditForm = (req, res) => {

    const id = req.params.id;

    db.get(

        "SELECT * FROM news WHERE id = ?",

        [id],

        (err, noticia) => {

            if (err) {

                console.log(err);

                return res.send("Erro ao carregar notícia.");

            }

            if (!noticia) {

                return res.redirect("/admin/noticias");

            }

            res.render("editar-noticia", {
                noticia,
                user: req.session.user
            });

        }

    );

};

// =======================
// Atualizar Notícia
// =======================

exports.updateNews = (req, res) => {

    const id = req.params.id;

    const {
        titulo,
        categoria,
        imagem,
        conteudo
    } = req.body;

    db.run(

        `UPDATE news
        SET
            titulo = ?,
            categoria = ?,
            imagem = ?,
            conteudo = ?
        WHERE id = ?`,

        [
            titulo,
            categoria,
            imagem,
            conteudo,
            id
        ],

        function (err) {

            if (err) {

                console.log(err);

                return res.send("Erro ao atualizar notícia.");

            }

            res.redirect("/admin/noticias");

        }

    );

};

// =======================
// Apagar Notícia
// =======================

exports.deleteNews = (req, res) => {

    const id = req.params.id;

    db.run(

        "DELETE FROM news WHERE id = ?",

        [id],

        function(err){

            if(err){

                console.log(err);

                return res.send("Erro ao apagar notícia.");

            }

            res.redirect("/admin/noticias");

        }

    );

};