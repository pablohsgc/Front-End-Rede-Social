const API_URL = "https://rede-social-enxurrada.herokuapp.com";
//const API_URL = "http://localhost:5000"; 
const postagensEl = document.querySelector("#postagens");


async function inserirComentario(idPost){
    let user = JSON.parse(localStorage.getItem('usuario-exdb'));

    let comentario = document.querySelector(`#comentario-post-${idPost}`).value;
    
    let dados = {
        idPost:idPost,
        mensagem:comentario 
    }

    console.log(user);
    await fetch(API_URL + "/postagens/insereComentario", {
        method: 'POST',
        body: JSON.stringify(dados),

        headers: { "Content-type": "application/json; charset=UTF-8","bearer":user.token }
    })
    .then(response => {
        carregaPostagens();
    })
    .catch((erro) => {
        alert("Não foi possivel cadastrar!");
    })
}

function criaElementoComentario(comentario){
    return `
        <section class="comentario-postagens">
            <header class="cabecalho-comentario">${comentario.username}</header>
            <div class="texto-comentario">${comentario.mensagem}</div>
        </section>
    `;
}

function criaElementoComentarios(comentarios){
    let qtdComentario = 0;
    let comentario,elementoComentarios="";

    while(qtdComentario < comentarios.length){
        comentario = criaElementoComentario(comentarios[qtdComentario]);
        elementoComentarios += comentario;

        qtdComentario = qtdComentario + 1;
    } 

    return elementoComentarios;
}

function criaElementoPostagem(postagem){
    let elemento = `
        <article class="postagem">
            <header class="cabecalho-postagem">${postagem.username} - ${postagem.date.substring(0,10).split("-").reverse()}</header>
            <div class="texto-postagem">${postagem.mensagem}</div>
            <footer class="rodape-postagem">
                <h3>Comentarios</h3>
                ${criaElementoComentarios(postagem.comentarios)}
                <div class="areaComentario">
                    <input type="text" id="comentario-post-${postagem._id}" placeholder="Escreva um comentário:"/>
                    <button class="botao-comentar" onclick="inserirComentario('${postagem._id}')">Comentar</button>
                </div>
            </footer>
        </article>
        `;
    return elemento;
}//inserirComentario(${postagem._id})

async function adicionaPostagens(postagens){
    let qtdPostagem = 0;
    let postagem;

    postagensEl.innerHTML = "";

    while(qtdPostagem < postagens.length){
        postagem = criaElementoPostagem(postagens[qtdPostagem]);
        postagensEl.innerHTML += postagem;

        qtdPostagem = qtdPostagem + 1;
    } 
}

async function carregaPostagens(){
    let postagens = await fetch(API_URL+"/postagens").then(response => response.json());
    adicionaPostagens(postagens);
}

carregaPostagens();

