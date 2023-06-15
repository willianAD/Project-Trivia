# Trivia em React Redux

Um jogo de perguntas e respostas baseado no jogo Trivia, parecido um show do milhão americano, utilizando React e Redux.

[API Trivia](https://opentdb.com/api_config.php)

O app começa com uma tela na qual a pessoa que joga coloca seu nome e seu e-mail. O e-mail será usado para buscar a foto associada no site Gravatar, se houver.

Logo após, ela é redirecionada para o jogo em que deve escolher uma das respostas disponíveis para cada uma das perguntas. A resposta deve ser marcada antes de o contador de tempo chegar a zero; caso contrário, a resposta deve ser considerada como errada.

Cada acerto dá pontos que deverão ser computados num placar, no header da aplicação, à pessoa que joga. Após 5 perguntas respondidas, a pessoa que joga é redirecionada para uma tela de score, em que o texto mostrado vai depender do número de acertos. No fim de cada jogo, a pessoa que joga pode acessar o ranking com as melhores pontuações.

## Funcionalidades

- Realizar login com nome e email;
- Caso queira ter uma imagem sua no jogo cadastre [Aqui](https://wordpress.com/log-in?client_id=1854&redirect_to=https%3A%2F%2Fpublic-api.wordpress.com%2Foauth2%2Fauthorize%3Fclient_id%3D1854%26response_type%3Dcode%26blog_id%3D0%26state%3D7e6c8d7b7a1514d7c6413290be2152f62df51b0647311edda6c511427aa01b17%26redirect_uri%3Dhttps%253A%252F%252Fen.gravatar.com%252Fconnect%252F%253Faction%253Drequest_access_token%26from-calypso%3D1)
- Responder as perguntas;
- Timer de 30 segundo regressivos para responder as perguntas;
- Página de Feedback onde você vê sua pontuação e pode escolher entre jogar novamente ou ver o ranking.
- Ranking guarda todas pontuações dos seus jogos anteriores.
- Ferramenta usada como kanban foi o [Trello](https://trello.com/b/2mZxlQC7/trivia-react-redux-startest).

## Pré-requisitos

- Node.js instalado
- NPM (Node Package Manager) instalado

## Como usar

1. Clone este repositório:

Poderá ser acessado através deste link [clique aqui](https://willianad.github.io/Project-Trivia/).

ou

HTTPS:

Use o comando: `git clone https://github.com/willianAD/Project-Trivia.git`

ou SSH:

Use o comando: `git clone git@github.com:willianAD/Project-Trivia.git`



2. Navegue até o diretório do projeto:

Use o comando: `cd Project-Trivia`



3. Instale as dependências:

Use o comando: `npm install`



4. Inicie o servidor de desenvolvimento:

Use o comando: `npm start`



5. Abra seu navegador e acesse `http://localhost:3000` para ver o projeto em execução.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [Trybe](https://www.betrybe.com/).
