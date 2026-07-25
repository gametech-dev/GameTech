const express = require("express");
const router = express.Router();

// Página Inicial
router.get("/", (req, res) => {
    res.render("index");
});

// Página de Login
router.get("/login", (req, res) => {
    res.render("login");
});

// Página de Cadastro
router.get("/cadastro", (req, res) => {
    res.render("cadastro");
});

// Página de Notícias
router.get("/noticias", (req, res) => {
    res.render("noticias");
});
// Página de Perfil
router.get("/perfil", (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    res.render("perfil", {
        user: req.session.user
    });

});
module.exports = router;