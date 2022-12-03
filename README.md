# API REST com Node

Este projeto é uma aplicação BACK-END que é basicamente um CRUD de Autor e Livro

## Característica do projeto

- TypeScript
- Node
- Express
- MongoDB
- Modularizado
- Logging customizado

## Banco de dados MongoDB

Conecte a aplicação com o banco de dados MongoDB e pegue as seguinte informações:

- Nome do usuário
- Senha
- Porta

Essa informações serão necessárias para conectar a aplicação com o banco de dados.

Obs.: Se você estiver usando o MongoDB Atlas você deve adicionar seu IP na whitelist (lista de IPs confiáveis)

## Arquivo .env

Crie um arquivo .env e coloque as seguintes informações

- MONGO_USERNAME="username"
- MONGO_PASSWORD="password"
- SERVER_PORT="port"

## Iniciar aplicação

Dê o comando npm install para instalar todos os pacotes
Dê o comando nodemon para iniciar a aplicação

## Métodos

### Verifica a saúde do ping

http://localhost:9090/ping/

### Autor

#### Get all authors
http://localhost:9090/authors/get

#### Create new author
http://localhost:9090/authors/create/

#### Update author
http://localhost:9090/authors/update/:idDoAutor

#### Delete author
http://localhost:9090/authors/delete/:idDoAutor

### Book

#### Get all book
http://localhost:9090/books/get

#### Create new book
http://localhost:9090/books/create/

#### Update book
http://localhost:9090/books/update/:idDoLivro

#### Delete book
http://localhost:9090/books/delete/:idDoLivro

## Explicação básica dos módulos

O coração do sistema está dentro da pasta src. E dentro dela temos várias pastas.

### server.ts

Nesse arquivo é onde iniciamos a aplicação. Ela inicia a conexão com banco de dados e iniciar também as rotas principais.

### config

Nessa pasta nos temos as configurações de conexão com o banco de dados da aplicação. Nela, pegamos os dados do arquivo .env e setamos o nome de usuário, a senha, a URL do mongodb, e dizemos também qual é a porta que está em uso.

### controllers

Nessa pasta temos os controllers de cada entidade da nossa aplicação. Cada controller terá os seguintes métodos:

- create
- read
- readAll
- update
- delete

É aqui onde de fato a aplicação irá fazer as modificações no banco de dados.

### library

Aqui contém nossas bibliotecas. Ou seja, código que será compartilhado durante todo o ciclo de vida da aplicação e pode ser útil de alguma forma.

### middleware

[Não está em uso no momento]

Nessa pasta é onde fazemos as validações dos textos que inserimos no body das requisições. É onde, por exemplo, filtramos com as expressões regulares (regex).

### models

Aqui temos todos os modelos de nossas entidades. Em cada modelo nos definimos o esquema de cada entidade. O esquema basicamente dizem que atributos a entidade teria e qual seria o tipo de atributo.

### routes

Nessa pasta é onde fazemos a ligação entre o caminho acessado e o método correpondente. Por exemplo, se você acessar /create, o método create() será chamado. Isso é definido nessa pasta.
