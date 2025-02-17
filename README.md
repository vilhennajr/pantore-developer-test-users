<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Projeto NestJS

Este é um repositório inicial para projetos utilizando o framework [NestJS](https://github.com/nestjs/nest), um framework progressivo para construção de aplicações server-side eficientes e escaláveis com Node.js.

## 🚀 Configuração do Projeto

Para iniciar o projeto, utilize os seguintes comandos:

```bash
docker-compose build
docker-compose up -d
```

Isso garantirá que todos os serviços necessários sejam iniciados corretamente.


## 🔗 Endpoints e Exemplos - cURL

### Criar um usuário
```bash
curl --request POST \
  --url http://localhost:3000/users \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "Flaviano Vilhenna",
	"email": "flavianovilhenna@gmail.com",
	"password": "newLife@23",
	"role": "ADMIN"
}'
```

### Atualizar um usuário
```bash
curl --request PATCH \
  --url http://localhost:3000/users/71d8f982-1981-46be-b0a2-ab09a1524cb7 \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "Flaviano Vilhenna Atualizado"
}'
```

### Listar usuários com paginação
```bash
curl --request GET \
  --url 'http://localhost:3000/users?page=2&limit=5' \
  --header 'User-Agent: insomnia/10.3.1'
```

### Filtrar usuário por parâmetros
```bash
curl --request GET \
  --url 'http://localhost:3000/users/filter?id=5e1e82bb-cbf3-477e-b9b5-04cec9b1be8a' \
  --header 'User-Agent: insomnia/10.3.1'
}'
```

### Gerar Token - Alterar senha
```bash
curl --request POST \
  --url http://localhost:3000/users/reset-password \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "flavianovilhenna@gmail.com",
	"password": "newLife@23"
}'
```

### Alterar Senha
```bash
curl --request POST \
  --url http://localhost:3000/users/reset-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZmQ0ZGY2Ny1kNWQzLTQyNmItODQ4Zi1hM2ZmMWU5Y2FiMTMiLCJpYXQiOjE3Mzk3NDY0OTAsImV4cCI6MTczOTc1MDA5MH0.czK_5lKqjG4XlnrcZYSzYHmTfgUUUuTlVIw3fsN2TN4 \
  --header 'Content-Type: application/json' \
  --data '{
	"newPassword": "novaSenha123"
}'
```