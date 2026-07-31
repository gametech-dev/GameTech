const express = require("express");
const router = express.Router();

const newsController = require("../controllers/newsController");

// Dashboard
router.get("/", (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    res.render("admin", {
        user: req.session.user
    });

});

// Notícias
router.get("/noticias", newsController.adminNews);

router.get("/noticias/nova", newsController.showNewForm);
router.post("/noticias/nova", newsController.createNews);

router.get("/noticias/:id/editar", newsController.showEditForm);
router.post("/noticias/:id/editar", newsController.updateNews);

// NOVO
router.get("/noticias/:id/apagar", newsController.deleteNews);

module.exports = router;