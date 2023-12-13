# Projeto TFC
O TFC é um site informativo sobre partidas e classificações de futebol. O front-end foi disponibilizado pela Trybe, e eu desenvolvi o back-end, que consiste em uma API e um banco de dados, ambos criados utilizando arquitetura em camadas e programação orientada a objetos (POO).

## Tecnologias utilizadas
- <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>
- <a href="https://www.docker.com/" target="_blank">Docker</a>
- <a href="https://expressjs.com/" target="_blank">Express</a>
- <a href="https://joi.dev/">Joi</a>
- <a href="https://jwt.io/" target="_blank">JSON Web Token (JWT)</a>
- <a href="https://www.mysql.com/" target="_blank">MySQL</a>
- <a href="https://sequelize.org/" target="_blank">Sequelize</a>
- <a href="https://mochajs.org/" target="_blank">Mocha</a>
- <a href="https://www.chaijs.com/" target="_blank">Chai</a>
- <a href="https://sinonjs.org/" target="_blank">Sinon</a>
- <a href="https://www.npmjs.com/package/bcryptjs" target="_blank">bcrypt.js</a>
- <a href="https://nodemon.io/" target="_blank">Nodemon</a>

## Como utilizar
- Clone o repositório e entre no diretório
  ```
  git clone git@github.com:fredericobrion/TFC.git && cd TFC
  ```
- Execute o comando ```npm run compose:up``` para iniciar a aplicação em sua máquina.

## Funcionalidades
1) Endpoint ```/teams``` para retornar todos os times.
   -  ```GET /teams``` retorna todos os times.
   -  ```GET /teams/:id``` retorna um time pelo id.
  
2) Endpoint ```/login``` para realizar o login.
   - Espera receber no corpo da requisição um ```email``` válido e um ```password``` com mais de 6 caracteres.
   - ```POST /login``` realiza login e retorna um token.
   - ```GET /login/role``` recebe um ```header``` com parâmetro ```authorization``` com o token no formato ``` `Bearer ${token}` ``` e retorna os dados no front.
   
3) Endpoint ```/matches``` para retornar as partidas
  - ```GET /matches``` retorna todas as partidas.
  - ```GET /matches?inProgress=true e GET /matches?inProgress=false``` retornam as partidas em andamento ou finalizadas.
  - ```PATCH /matches/:id/finish``` finaliza uma partida. É necessário o envio de um token válido.
  - ```PATCH /matches/:id``` atualiza uma partida. É necessário o envio de um token válido. O corpo da requisição deverá ter o seguinte formato:
  ```
  "homeTeamGoals": 3,
  "awayTeamGoals": 1,
  ```
  - ```POST /matches``` permite a criação de um banco de dados. É necessário o envio de um token válido. O corpo da requisição deverá ter o seguinte formato:
  ```
  "homeTeamId": 16,
  "awayTeamId": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
  ```
4) Endpoint ```/leaderboard``` para construir a classificação dos times
   - ```GET /leaderboard/home``` filtra a classificação dos times da casa.
   - ```GET /leaderboard/away``` filtra a classificação dos times visitantes.
   - ```GET /leaderboard``` filtra a classificação geral dos times.
  
  ## Testes
  Para testar a aplicação, entre na pasta ```backend``` e rode o comando ```npm run test```.
