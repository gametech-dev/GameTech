const express = require("express");
const router = express.Router();

const newsController = require("../controllers/newsController");

// Página Nova Notícia
router.get("/noticias/nova", newsController.showNewForm);

router.post("/noticias/nova", newsController.createNews);

module.exports = router;