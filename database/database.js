const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/gametech.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Base de dados ligada com sucesso!");

        // Tabela de utilizadores
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                admin INTEGER DEFAULT 0
            )
        `);

        console.log("Tabela de utilizadores criada.");

        // Tabela de notícias
        db.run(`
            CREATE TABLE IF NOT EXISTS news (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT NOT NULL,
                categoria TEXT NOT NULL,
                imagem TEXT,
                conteudo TEXT NOT NULL,
                autor TEXT NOT NULL,
                destaque INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("Tabela de notícias criada.");
    }
});

module.exports = db;