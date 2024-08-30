const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
overlay.addEventListener("click", (e) => {
    overlay.style.display = "none"
    modal.style.display = "none"
    modal.innerHTML = ""
})

async function criarProduto(produto) {
    let divProdutos = document.querySelector(".produtos")

    const produtoDiv = document.createElement("div")
    produtoDiv.classList.add("produto")

    const imgProduto = document.createElement("img")
    imgProduto.src = "assets/" + produto.img
    imgProduto.alt = produto.nome
    produtoDiv.appendChild(imgProduto)

    const nomeProduto = document.createElement("h2")
    nomeProduto.classList.add("nome-produto")
    nomeProduto.textContent = produto.nome
    produtoDiv.appendChild(nomeProduto)

    const precoProduto = document.createElement("p")
    precoProduto.classList.add("preco-produto")
    precoProduto.textContent = "R$ " + produto.preco
    produtoDiv.appendChild(precoProduto)

    const botoesDiv = document.createElement("div")
    botoesDiv.classList.add("botoes")

    const botaoCarrinho = document.createElement("button")
    botaoCarrinho.classList.add("carrinho")
    const imgCarrinho = document.createElement("img")
    imgCarrinho.src = "assets/carrinho.png"
    imgCarrinho.alt = "Adicionar ao carrinho"
    botaoCarrinho.appendChild(imgCarrinho)
    botoesDiv.appendChild(botaoCarrinho)
    botaoCarrinho.onclick = function () {
        let carrinho = JSON.parse(localStorage.getItem("carrinho"))
        botaoCarrinho.classList.toggle("adicionado-ao-carrinho")
        if (carrinho.includes(produto.id)) {
            carrinho = carrinho.filter(item => item !== produto.id)
            localStorage.setItem("carrinho", JSON.stringify(carrinho))
        } else {
            carrinho.push(produto.id)
            localStorage.setItem("carrinho", JSON.stringify(carrinho))
        }
    }

    const carrinho = JSON.parse(localStorage.getItem("carrinho"))

    if (carrinho.includes(produto.id)) {
        botaoCarrinho.classList.add("adicionado-ao-carrinho")
    }

    const botaoFavoritos = document.createElement("button")
    const imgFavoritos = document.createElement("img")
    imgFavoritos.src = "assets/favoritos.png"
    imgFavoritos.alt = "Adicionar aos favoritos"
    botaoFavoritos.appendChild(imgFavoritos)
    botoesDiv.appendChild(botaoFavoritos)
    if (localStorage.getItem("usuario") !== null) {
        const usuario = JSON.parse(localStorage.getItem("usuario"))
        const response = await fetch(`http://localhost:3000/produto/favorito?usuario=${usuario.id}&produto=${produto.id}`)
        const results = await response.json()
        
        if (results.success) {
            if (results.data[0]) {
                botaoFavoritos.classList.add("adicionado-ao-carrinho")
            }
        } else {
            alert(results.message)
        }
        
        botaoFavoritos.onclick = async function () {
            if (botaoFavoritos.classList.contains("adicionado-ao-carrinho")) {
                const response = await fetch(`http://localhost:3000/produto/favorito/remover`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({usuario: usuario.id, produto: produto.id})
                })
                const results = await response.json()
                
                if (results.success) {
                    botaoFavoritos.classList.remove("adicionado-ao-carrinho")
                } else {
                    alert(results.message)
                }
            } else {
                const response = await fetch(`http://localhost:3000/produto/favoritar`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({usuario: usuario.id, produto: produto.id})
                })
                const results = await response.json()
                
                if (results.success) {
                    botaoFavoritos.classList.add("adicionado-ao-carrinho")
                } else {
                    alert(results.message)
                }
            }
        }
    }

    produtoDiv.appendChild(botoesDiv)

    divProdutos?.appendChild(produtoDiv)
}

function criarProdutoCarrinhoUsuario(produto) {
    let divProdutos = document.querySelector(".carrinho-conta")

    const produtoDiv = document.createElement("div")
    produtoDiv.classList.add("produto")

    const imgProduto = document.createElement("img")
    imgProduto.src = "assets/" + produto.img
    imgProduto.alt = produto.nome
    produtoDiv.appendChild(imgProduto)

    const nomeProduto = document.createElement("h2")
    nomeProduto.classList.add("nome-produto")
    nomeProduto.textContent = produto.nome
    produtoDiv.appendChild(nomeProduto)

    const precoProduto = document.createElement("p")
    precoProduto.classList.add("preco-produto")
    precoProduto.textContent = "R$ " + produto.preco
    produtoDiv.appendChild(precoProduto)

    const botoesDiv = document.createElement("div")
    botoesDiv.classList.add("botoes")

    const botaoCarrinho = document.createElement("button")
    botaoCarrinho.classList.add("carrinho")
    const imgCarrinho = document.createElement("img")
    imgCarrinho.src = "assets/carrinho.png"
    imgCarrinho.alt = "Adicionar ao carrinho"
    botaoCarrinho.appendChild(imgCarrinho)
    botoesDiv.appendChild(botaoCarrinho)
    botaoCarrinho.onclick = function () {
        let carrinho = JSON.parse(localStorage.getItem("carrinho"))
        botaoCarrinho.classList.toggle("adicionado-ao-carrinho")
        if (carrinho.includes(produto.id)) {
            carrinho = carrinho.filter(item => item !== produto.id)
            localStorage.setItem("carrinho", JSON.stringify(carrinho))
        } else {
            carrinho.push(produto.id)
            localStorage.setItem("carrinho", JSON.stringify(carrinho))
        }
    }

    const carrinho = JSON.parse(localStorage.getItem("carrinho"))

    if (carrinho.includes(produto.id)) {
        botaoCarrinho.classList.add("adicionado-ao-carrinho")
    }

    produtoDiv.appendChild(botoesDiv)

    divProdutos?.appendChild(produtoDiv)
}

// Função para criar o HTML do produto no carrinho
function criarProdutoCarrinho(produto) {
    const produtoCarrinhoDiv = document.createElement("div");
    produtoCarrinhoDiv.classList.add("produto-carrinho");

    const imgProduto = document.createElement("img");
    imgProduto.src = "assets/" + produto.img;
    imgProduto.alt = produto.nome;
    produtoCarrinhoDiv.appendChild(imgProduto);

    const informacoesCarrinhoDiv = document.createElement("div");
    informacoesCarrinhoDiv.classList.add("informacoes-carrinho");

    const nomeProduto = document.createElement("h2");
    nomeProduto.textContent = produto.nome;
    informacoesCarrinhoDiv.appendChild(nomeProduto);

    const precoProduto = document.createElement("p");
    precoProduto.textContent = "R$ " + produto.preco;
    informacoesCarrinhoDiv.appendChild(precoProduto);

    produtoCarrinhoDiv.appendChild(informacoesCarrinhoDiv);

    modal.appendChild(produtoCarrinhoDiv);
}

async function pegarProdutos() {
    const response = await fetch("http://localhost:3000/get/produtos")
    const results = await response.json()

    if (results.success) {
        results.data.forEach(async (produto) => {
            await criarProduto(produto)
        })
        const botaoModal = document.querySelector(".carrinho-header")
        botaoModal.onclick = function () {
            modal.style.display = "flex"
            overlay.style.display = "flex"

            const carrinho = JSON.parse(localStorage.getItem("carrinho"))
            if (carrinho.length === 0) {
                const mensagem = document.createElement("p")
                mensagem.textContent = "Sem nenhum item no carrinho"
                modal.appendChild(mensagem)
            } else {
                const titulo = document.createElement("h2")
                titulo.textContent = "Carrinho"
                modal.appendChild(titulo)

                results.data.forEach(produto => {
                    if (carrinho.includes(produto.id)) {
                        criarProdutoCarrinho(produto);
                    }
                })

                const aComprar = document.createElement("a")
                aComprar.classList.add("botao-comprar")
                aComprar.textContent = "Finalizar Compra"
                aComprar.href = "finalizar-compra.html"
                modal.appendChild(aComprar)
            }
        }
        const carrinho = JSON.parse(localStorage.getItem("carrinho"))
        if (carrinho.length === 0) {
            let divProdutos = document.querySelector(".carrinho-conta")
            const p = document.createElement("p")
            p.textContent = "Carrinho Vazio"
            divProdutos.appendChild(p)
        } else {
            results.data.forEach(produto => {
                if (carrinho.includes(produto.id)) {
                    criarProdutoCarrinhoUsuario(produto);
                }
            })
        }
    } else {
        alert(results.message)
    }
}

pegarProdutos()

if (!localStorage.getItem("carrinho")) {
    localStorage.setItem("carrinho", "[]")
}

async function cadastrar(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value;

    const data = {nome, sobrenome, email, senha};

    for (let pos in data) {
        if (!data[pos]) {
            alert("Valor " + pos + " inválido")
            return;
        }
    }

    const response = await fetch("http://localhost:3000/usuario/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();

    if (results.success) {
        const id = results.data.insertId
        localStorage.setItem("usuario", JSON.stringify({...data, id}))
        location.href = "http://127.0.0.1:5500/frontend/index.html"
    } else {
        alert(results.message)
    }
}

async function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value;

    const data = {email, senha}

    for (let pos in data) {
        if (!data[pos]) {
            alert("Valor " + pos + " inválido")
            return;
        }
    }

    const response = await fetch(`http://localhost:3000/usuario/login?email=${email}&senha=${senha}`)

    const results = await response.json();

    if (results.data.length === 0) {
        alert("Usuário não encontrado")
    } else if (results.success) {
        localStorage.setItem("usuario", JSON.stringify(results.data[0]))
        location.href = "http://127.0.0.1:5500/frontend/index.html"
    } else {
        alert(results.message)
    }
}

async function comprar(event) {
    event.preventDefault();

    localStorage.setItem("carrinho", "[]")
    alert("Compra concluída")
    location.href = "http://127.0.0.1:5500/frontend/index.html"
}

const finalizar_compra = document.querySelector(".formulario-finalizar-compra")
if (finalizar_compra) {
    if (localStorage.getItem("usuario") === null) {
        location.href = "http://127.0.0.1:5500/frontend/login.html"
    }
    document.getElementById("nome").value = JSON.parse(localStorage.getItem("usuario")).nome
    document.getElementById("sobrenome").value = JSON.parse(localStorage.getItem("usuario")).sobrenome
}

const login2 = document.querySelector(".formulario-login")
if (login2) {
    if (localStorage.getItem("usuario") !== null) {
        location.href = "http://127.0.0.1:5500/frontend/usuario.html"
    }
}

const cadastro = document.querySelector(".formulario-cadastro")
if (cadastro) {
    if (localStorage.getItem("usuario") !== null) {
        location.href = "http://127.0.0.1:5500/frontend/login.html"
    }
}

const criarProduto2 = document.querySelector(".formulario-criar-produto")
if (criarProduto2) {
    if (localStorage.getItem("usuario") === null || JSON.parse(localStorage.getItem("usuario"))?.cargo === "U") {
        location.href = "http://127.0.0.1:5500/frontend/index.html"
    }
}

const editarProduto2 = document.querySelector(".formulario-gerenciar-produto")
if (editarProduto2) {
    if (localStorage.getItem("usuario") === null || JSON.parse(localStorage.getItem("usuario"))?.cargo === "U") {
        location.href = "http://127.0.0.1:5500/frontend/index.html"
    }
}

async function cadastrarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const img = document.getElementById("img").value

    const data = {nome, preco, img};

    for (let pos in data) {
        if (!data[pos]) {
            alert("Valor " + pos + " inválido")
            return;
        }
    }

    const response = await fetch("http://localhost:3000/produto/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();

    if (results.success) {
        alert("Produto criado")
    } else {
        alert(results.message)
    }
}

async function editarProduto(event) {
    event.preventDefault();

    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const img = document.getElementById("img").value

    const data = {nome, preco, img};

    for (let pos in data) {
        if (!data[pos]) {
            alert("Valor " + pos + " inválido")
            return;
        }
    }

    const response = await fetch("http://localhost:3000/produto/atualizar/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();

    if (results.success) {
        alert("Produto alterado")
    } else {
        alert(results.message)
    }
}

async function deletarProduto(event) {
    event.preventDefault();

    const id = document.getElementById("id").value;

    const response = await fetch("http://localhost:3000/produto/deletar/" + id, {
        method: "DELETE",
    })

    const results = await response.json();

    if (results.success) {
        alert("Produto deletado")
    } else {
        alert(results.message)
    }
}

if (JSON.parse(localStorage.getItem("usuario"))?.cargo === "A") {
    const a = document.createElement("a")
    a.href = "gerenciar-produto.html"
    a.classList.add("engrenagem")

    const img = document.createElement("img")
    img.src = "assets/engrenagem.png"

    a.appendChild(img)
    const nav = document.querySelector("nav")
    nav.appendChild(a)
}

const nomeUsuario = document.querySelector(".nomeUsuario")
nomeUsuario.innerHTML = "<b>Nome:</b> " + JSON.parse(localStorage.getItem("usuario")).nome + " " + JSON.parse(localStorage.getItem("usuario")).sobrenome
const emailUsuario = document.querySelector(".emailUsuario")
emailUsuario.innerHTML = "<b>Email:</b> " + JSON.parse(localStorage.getItem("usuario")).email

async function deslogar(event) {
    event.preventDefault();
    localStorage.removeItem("usuario")
    location.href = "http://127.0.0.1:5500/frontend/login.html"
}