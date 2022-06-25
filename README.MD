# Projeto Rede Social

## Variaveis do tipo Object Java Script
As variáveis do tipo object do Java Script, são usadas para que possamos agrupar dados, por exemplo, imagine que querermos armazenar dados de uma pessoa, e essa pessoa possui: nome, idade, peso. Para isso podemos agrupar em um objeto.

Podemos agrupar os objetos entre chaves, e dentro de cada chave colocamos pares de 'propriedade:valor'.

```js
let pessoa = {
    nome:"Joana",
    idade:30,
    peso:62.5
}
```

## Requisições

### Método get
Para fazer uma requisição utilizando o *fetch* no java script basta utilizar o código abaixo para fazer requisições com o método GET.

 - As requisições da função *fetch* devem possuir uma URL, que será usada para rquisição como parâmetro.

```js
fetch("https://pablohsg.github.io/Requisicoes/API/produtos.json")
.then(response => response.json())
.then(json => {
    console.log(json)
})
.catch(erro => {
    console.log("Erro\n" + erro)
});
```

### Método post
Para fazer uma requisição utilizando o *fetch* no java script basta utilizar o código abaixo para fazer requisições com o método POST.

 - Diferentes das requisições do método GET devemos adicionar algumas opções no segundo parâmetro da função *fetch*, como por exemplo:
    - *method*: informa o método como POST
    - *body*: informa os dados utilizando objetos java script, que serão enviados. Obs: os dados devem estar no formato JSON, para isso use a função 'JSON.stringify(dados)'
    - *headers*: contém algumas informações sobre a requisição, como por exemplo o tipo de conteúdo enviado e a codificação dos caracteres.

```js
fetch(URL, {
    method: 'POST',
    body: JSON.stringify(dados),

    headers: { "Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json())
.catch((erro) => {
    alert("Não foi possivel cadastrar!");
});
```

## Utilizando requisições para a rede social
Para essa rede social, foi feito um servidor hospedado na Heroku, com o seguinte link: https://rede-social-enxurrada.herokuapp.com

Vamos fazer as requisições para esse servidor e ele informará os dados que precisamos.

Como utilizaremos esse link como base para nossas requisições, é aconselhável salvar o link em uma variável constante no inicio do código.

```js
const API_URL = "https://rede-social-enxurrada.herokuapp.com";
```

Observação: as requisições, demoram para retornar os dados, para que o fluxo da nossa página funcione corretamente, adicionamos a paralvra reservada *await* antes das requisições, para que o script espere a função terminar para continuar o fluxo normal do programa. 

### Requisitando postagens
O servidor possui oque uma rota que está em '/postagens', vamos concatenar a API_URL armazenada com a rota que desejamos e fazer uma requisição do tipo GET para obtermos todas as postagens.

A requisição ficará da seguinte forma e retornará todas as postagens.

```js
await fetch(API_URL+"/postagens").then(response => response.json());
```

### Requisitando login
O servidor possui oque uma rota que está em '/login', vamos concatenar a API_URL armazenada com a rota que desejamos e fazer uma requisição do tipo POST para obtermos todas as postagens.

Observação: um objeto dados deve conter as informações de username, e password. Que será processado pelo servidor.

```js
let dados = {
    username:username,
    password:password
}
```

A requisição ficará da seguinte forma e retornará todas as postagens.

```js
await fetch(API_URL + "/login", {
    method: 'POST',
    body: JSON.stringify(dados),
    headers: { "Content-type": "application/json; charset=UTF-8" }
})
.then(response => response.json())
.catch((erro) => {
    return erro;
})
```

Após receber o resultado da requisição, devemos verificar se possui erro na requisição. Caso não nenhum erro, vamos salvar no navegador, os dados da autenticação da requisição de login. 

Veja no final do arquivo [como salvar os dados em localStorage](#armazenando-dados-em-localstorage).

### Requisitando a inserção de comentários
O servidor possui oque uma rota que está em '/postagens/inserirComentario', vamos concatenar a API_URL armazenada com a rota que desejamos e fazer uma requisição do tipo POST para obtermos todas as postagens.

Como temos uma requisição do tipo post e queremos enviar dados, precisamos antes criar um objeto do tipo dados.

Como a aplicação possui autenticação, vamos adicionar aos 'headers', das opções da requisição, o token que armazenamos na autênticação. 

Dentro do then, do fetch, vamos chamar um método para chamar as todas as postagens novamente, assim o novo comentário será carregado na página.

```js
let dados = {
        idPost:idPost,
        mensagem:comentario 
    }

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
```

## Armazenando dados em localStorage
As vezes precisamos armazenar alguns dados no navegador, para que possamos compartilhar, um mesmo valor entre várias páginas, ou armazená-lo para não perdermos um dado ao fechar o navegador.

Para isso, podemos armazenar usando o localStorage.

### Salvando os dados
Os dados salvos devem ser strings. Caso não sejam strings devem ser convertidos para strings antes de serem armazenados.

Aqui vamos armazenas dados do tipo Object, para que possamos salvar mais de um valor. As requisições ensinadas aqui convertem a requisição automaticamente para objeto Java Script, para convertê-lo para string, vamos usar a função JSON.stringify(dados) e logo após armazená-lo no localStorage com o comando setItem.

A função setItem, deve conter nos parâmetros, um nome de variável para ser adicionado no localStorage, e os dados a serem armazenados, da seguinte forma.

```js
    localStorage.setItem("usuario-exdb",JSON.stringify(dados))
```

### Recuperando os dados
Os dados podem ser recuperados do localStorage usando a função getItem, que deve ter como parâmetro o nome da variável armazenada.

Como a variável armazenada era um object antes de ser String, podemos convertê-la para Object usando a função JSON.parse(dados).

```js
    let user = JSON.parse(localStorage.getItem("usuario-exdb"))
```

### Removendo os dados
Um dado armazenado em localStorage pode ser removido usando a função removeItem, que recebe como parâmetro o 

```js
    localStorage.removeItem("usuario-exdb");
```
