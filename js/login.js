const API_URL = "https://rede-social-enxurrada.herokuapp.com";

const inputEmail = document.querySelector("#email");
const inputSenha = document.querySelector("#senha");
const botaoLogin = document.querySelector("#botaoLogin");

async function requisitaLogin(username,password){
    let dados = {
        username:username,
        password:password
    }

    return await fetch(API_URL + "/login", {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .catch((erro) => {
        return erro;
    })
}

async function login(){
    let resposta = await requisitaLogin(inputEmail.value,inputSenha.value);
    
    if(resposta.erro){
        alert(resposta.erro);
    }else{
        localStorage.setItem("usuario-exdb",JSON.stringify(resposta));
        window.location.href = "index.html";
    }
}

function logout(){
    localStorage.removeItem("usuario-exdb");
    window.location.href = "login.html";
}

botaoLogin.onclick = login;