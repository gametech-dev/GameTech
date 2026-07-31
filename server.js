console.log("ESTE É O SERVER CERTO");

const express = require("express");
const session = require("express-session");
const path = require("path");
const bcrypt = require("bcrypt");
const noticiasRoutes = require("./routes/noticias");

console.log("1 - Express carregado");

const db = require("./database/database");
console.log("2 - Base de dados carregada");

const authRoutes = require("./routes/auth");
console.log("3 - Rotas carregadas");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = 3000;

// =======================
// Configuração
// =======================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "gametech2026",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// =======================
// Rotas
// =======================

app.get("/teste", (req, res) => {
    res.render("noticias", { noticias: [] });
});

app.use("/", authRoutes);
app.use("/", noticiasRoutes);
app.use("/admin", adminRoutes);

// =======================
// Cadastro
// =======================

app.post("/cadastro", async (req, res) => {

    const { nome, email, password } = req.body;

    try {

        const hash = await bcrypt.hash(password, 10);

        db.run(
            "INSERT INTO users(nome,email,password) VALUES(?,?,?)",
            [nome, email, hash],
            function (err) {

                if (err) {

                    console.log(err);

                    return res.send("Erro ao criar conta.");

                }

                res.redirect("/login");

            }

        );

    } catch (err) {

        console.log(err);

        res.send("Erro interno.");

    }

});

// =======================
// Login
// =======================

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    db.get(

        "SELECT * FROM users WHERE email = ?",

        [email],

        async (err, user) => {

            if (err || !user) {

                return res.send("Email ou palavra-passe inválidos.");

            }

            const ok = await bcrypt.compare(password, user.password);

            if (!ok) {

                return res.send("Email ou palavra-passe inválidos.");

            }

            req.session.user = user;

            res.redirect("/admin");

        }

    );

});

// =======================
// Admin
// =======================

app.get("/admin", (req, res) => {

    if (!req.session.user) {

        return res.redirect("/login");

    }

    res.render("admin", {
        user: req.session.user
    });

});

// =======================
// Logout
// =======================

app.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.redirect("/");

    });

});

console.log("4 - Antes do listen");

// =======================
// Servidor
// =======================

app.listen(PORT, () => {

    console.log("");
    console.log("=================================");
    console.log(" GameTech iniciado com sucesso");
    console.log(" http://localhost:3000");
    console.log("=================================");
    console.log("");

});