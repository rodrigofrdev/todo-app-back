const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./database/database");

const todoRoutes = require("./routes/todo");
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/error");

const User = require("./models/user");
const Todo = require("./models/todo");
const defineAssociations = require("./models/associations/index");
defineAssociations();

const app = express();

// Configuração do Sequelize para armazenamento de sessão
const store = new SequelizeStore({
  db: sequelize,
});

// Middlewares
app.use(bodyParser.json()); // Parseia requisições JSON
app.use(bodyParser.urlencoded({ extended: false })); // Parseia requisições urlencoded
const corsOptions = {
  origin: 'http://localhost:5173', // Endereço do frontend
  credentials: true, // Permite envio de cookies entre frontend e backend
};
app.use(cors(corsOptions)); // Habilita CORS para comunicação entre frontend e backend
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    // cookie: {
    //   httpOnly: true, // Cookie só pode ser acessado pelo servidor
    // },
  })
);

// Middleware para adicionar o usuário à requisição
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  // Busca o usuário pelo ID na sessão e carrega os Todos associados
  User.findByPk(req.session.user.id)
    .then((user) => {
      if (!user) {
        throw new Error('User not found in database');
      }
      req.user = user; 
      next();
    })
    .catch((err) => {
      console.error('Error finding user:', err);
      next(err);
    });
});

// Rotas
app.get('/check-auth', (req, res) => {
  if (req.session.isLoggedIn && req.session.user) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});
app.use(todoRoutes); // Rotas para manipulação de todos
app.use(authRoutes); // Rotas para autenticação
app.use(errorController.get404); // Capturar rotas não encontradas

// Sincronização do banco de dados e inicialização do servidor
sequelize
  .sync({ models: [User, Todo, { model: store.model }] }) // Sincroniza modelos com o banco de dados
  .then(() => {
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });
