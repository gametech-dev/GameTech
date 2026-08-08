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

    const {
        titulo,
        categoria,
        imagem,
        conteudo
    } = req.body;

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

    const pesquisa = req.query.pesquisa || "";

    // Número da página atual
    let pagina = parseInt(req.query.pagina) || 1;

    if (pagina < 1) {

        pagina = 1;

    }

    // Notícias por página
    const porPagina = 6;

    // Calcula o OFFSET
    const offset = (pagina - 1) * porPagina;


    // =======================
    // Pesquisa
    // =======================

    let where = "";
    let params = [];

    if (pesquisa.trim() !== "") {

        where = `
            WHERE
                titulo LIKE ?
                OR categoria LIKE ?
                OR autor LIKE ?
        `;

        const termo = `%${pesquisa}%`;

        params = [
            termo,
            termo,
            termo
        ];

    }


    // =======================
    // Contar notícias
    // =======================

    const countSql = `
        SELECT COUNT(*) AS total
        FROM news
        ${where}
    `;

    db.get(
        countSql,
        params,
        (err, resultado) => {

            if (err) {

                console.log(err);

                return res.send(
                    "Erro ao contar notícias."
                );

            }

            const totalNoticias = resultado.total;

            const totalPaginas = Math.ceil(
                totalNoticias / porPagina
            );


            // =======================
            // Garantir página válida
            // =======================

            if (
                totalPaginas > 0 &&
                pagina > totalPaginas
            ) {

                pagina = totalPaginas;

            }


            const novoOffset =
                (pagina - 1) * porPagina;


            // =======================
            // Buscar notícias
            // =======================

            const sql = `
                SELECT *
                FROM news
                ${where}
                ORDER BY id DESC
                LIMIT ? OFFSET ?
            `;

            const queryParams = [
                ...params,
                porPagina,
                novoOffset
            ];


            db.all(
                sql,
                queryParams,
                (err, noticias) => {

                    if (err) {

                        console.log(err);

                        return res.send(
                            "Erro ao carregar notícias."
                        );

                    }


                    // =======================
                    // Formatar datas
                    // =======================

                    noticias.forEach(noticia => {

                        noticia.data =
                            new Date(
                                noticia.created_at
                            ).toLocaleDateString(
                                "pt-PT",
                                {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric"
                                }
                            );

                    });


                    // =======================
                    // Renderizar
                    // =======================

                    res.render("noticias", {

                        noticias,

                        pesquisa,

                        pagina,

                        totalPaginas,

                        totalNoticias

                    });

                }

            );

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

                return res.send(
                    "Erro ao carregar notícia."
                );

            }

            if (!noticia) {

                return res.send(
                    "Notícia não encontrada."
                );

            }

            noticia.data =
                new Date(
                    noticia.created_at
                ).toLocaleDateString(
                    "pt-PT",
                    {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    }
                );

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

                return res.send(
                    "Erro ao carregar notícias."
                );

            }

            noticias.forEach(noticia => {

                noticia.data =
                    new Date(
                        noticia.created_at
                    ).toLocaleDateString(
                        "pt-PT",
                        {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                        }
                    );

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

                return res.send(
                    "Erro ao carregar notícia."
                );

            }

            if (!noticia) {

                return res.redirect(
                    "/admin/noticias"
                );

            }

            res.render(
                "editar-noticia",
                {
                    noticia,
                    user: req.session.user
                }
            );

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

                return res.send(
                    "Erro ao atualizar notícia."
                );

            }

            res.redirect(
                "/admin/noticias"
            );

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

        function (err) {

            if (err) {

                console.log(err);

                return res.send(
                    "Erro ao apagar notícia."
                );

            }

            res.redirect(
                "/admin/noticias"
            );

        }

    );

};