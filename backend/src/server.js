const express = require("express");
const cors = require("cors");

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Rodando na porta ${port}`));

const connection = require("./db_config");

app.get("/get/produtos", (request, response) => {
    let query = "SELECT * FROM produtos;";

    connection.query(query, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
});

app.post("/produto/cadastrar", (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.preco,
        request.body.img
    )

    let query = "INSERT INTO produtos(nome, preco, img) VALUES (?,?,?);";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
})

app.put("/produto/atualizar/:id", (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.preco,
        request.body.img,
        request.params.id
    )

    let query = "UPDATE produtos SET nome = ?, preco = ?, img = ? WHERE id = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
});

app.delete("/produto/deletar/:id", (request, response) => {
    let params = Array(
        request.params.id
    )

    let query = "DELETE FROM produtos WHERE id = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
});

// Usuários
app.post("/usuario/cadastrar", (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.sobrenome,
        request.body.email,
        request.body.senha,
    )

    let query = "INSERT INTO usuarios(nome, sobrenome, email, senha) VALUES (?,?,?,?);";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
});

app.get("/usuario/login", (request, response) => {
    let params = Array(
        request.query.email,
        request.query.senha,
    )

    let query = "SELECT * FROM usuarios WHERE email = ? AND senha = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
})

// Favoritar
app.post("/produto/favoritar", (request, response) => {
    let params = Array(
        request.body.usuario,
        request.body.produto
    )

    let query = "INSERT INTO favoritos(id_usuario, id_produto) VALUES (?,?);";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
})

app.get("/produto/favorito", (request, response) => {
    let params = Array(
        request.query.usuario,
        request.query.produto
    )

    let query = "SELECT * FROM favoritos WHERE id_usuario = ? AND id_produto = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
})

app.delete("/produto/favorito/remover", (request, response) => {
    let params = Array(
        request.body.usuario,
        request.body.produto
    )

    let query = "DELETE FROM favoritos WHERE id_usuario = ? AND id_produto = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro",
                    data: err
                });
        }
    });
})