const express = require("express");
const router = express.Router();

const newsController = require("../controllers/newsController");

console.log(">>> routes/noticias.js carregado");

router.get("/noticias", newsController.listNews);

router.get("/noticias/:id", newsController.showNews);

module.exports = router;