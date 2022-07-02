const API_URL = "https://rede-social-enxurrada.herokuapp.com";

const inputNomeUsuario = document.querySelector("#nome");
const inputEmail = document.querySelector("#email");
const inputSenha = document.querySelector("#senha");
const botaoCadastrar = document.querySelector("#botaoCadastrar");

async function requisitaCadastro(nome,username,password){
    let dados = {
        name:nome,
        username:username,
        password:password
    }

    return await fetch(API_URL + "/usuarios", {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .catch(erro => erro);
}


async function cadastrarUsuario(){
    let resposta = await requisitaCadastro(inputNomeUsuario.value,inputEmail.value,inputSenha.value);
    
    if(resposta.erro){
        alert(resposta.erro);
    }else{
        alert("Usuário cadastrado!");
        window.location.href = "login.html";
    }
}

botaoCadastrar.onclick = cadastrarUsuario;