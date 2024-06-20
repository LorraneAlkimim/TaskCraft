# Task Craft

![Javascript](https://img.shields.io/badge/-Javascript-282A36?style=flat&logo=javascript)&nbsp;
![ReactJS](https://img.shields.io/badge/-ReactJS-282A36?style=flat&logo=react)&nbsp;
![React Router DOM](https://img.shields.io/badge/React%20Router%20DOM-%23092E20.svg?style=flat&logo=react-router)&nbsp;
![Vite](https://img.shields.io/badge/Vite-%2314354C.svg?style=flat&logo=vite)&nbsp;
![Axios](https://img.shields.io/badge/Axios-%2314354C.svg?style=flat&logo=axios&logoColor=5A29E4)&nbsp;
![Node.js](https://img.shields.io/badge/-Node.js-282A36?style=flat&logo=node.js)&nbsp;
![MongoDB](https://img.shields.io/badge/-MongoDB-282A36?style=flat&logo=mongodb)&nbsp;
![Docker](https://img.shields.io/badge/-Docker-282A36?style=flat&logo=docker)&nbsp;


## Sobre o projeto

Aplicação de gerenciamento de projetos e tarefas, utilizada para visualizar, cadastrar e editar projetos e suas respectivas tarefas, com suporte a autenticação e registro de usuários.

Para desenvolver essa aplicação foi utilizado as seguintes tecnologias:

- React
- React Router DOM
- Javascript
- Vite
- Tailwind
- RadixUI
- Axios
- Node.js
- Docker
- MongoDB

## Funcionalidades

- Registro de usuário
- Login com autenticação JWT
- Criação de projetos
- Listagem de projetos
- Edição de projetos
- Deleção de projetos
- Criação de tarefas atreladas à um projeto
- Listagem de tarefas do projeto
- Edição de tarefas
- Deleção de tarefas
- Permite a listagem de comissões filtrando por data de inicio e fim

## Como utilizar

1. Instale o [docker](https://docs.docker.com/engine/install/) em sua máquina

2. Clone este repositório

```
git clone https://github.com/LorraneAlkimim/TaskCraft.git
```

3. Crie um arquivo .env na raiz do projeto, e coloque as variáveis de ambiente como no .env.example

4. Rode o comando abaixo para criar os containers e executar o projeto

```
docker compose up -d
```

5. Acesse o endereço http://localhost com as portas definidas no seu arquivo .env