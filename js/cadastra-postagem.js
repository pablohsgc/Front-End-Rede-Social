const API_URL = "https://rede-social-enxurrada.herokuapp.com";

const inputMensagem = document.querySelector("#mensagem");
const botaoLogin = document.querySelector("#botaoCadastraPostagem");

async function requisitaCadastroPostagem(mensagem,token){
    let dados = {
        mensagem:mensagem
    }

    return await fetch(API_URL + "/postagens", {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: { "Content-type": "application/json; charset=UTF-8", "bearer":token }
    })
    .then(response => response.json())
    .catch(erro => erro);
}


async function cadastraPostagem(){
    let user = JSON.parse(localStorage.getItem('usuario-exdb'));

    let resposta = await requisitaCadastroPostagem(inputMensagem.value,user.token);

    if(resposta.erro){
        alert(resposta.erro);
    }else{
        alert("Postagem cadastrada!");
        window.location.href = "index.html";
    }
}

botaoLogin.onclick = cadastraPostagem;