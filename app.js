/** PACKAGES **/
const createError = require("http-errors");
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config= require('./config').config;
const sequelize= require('./config').sequelize;

const port = process.env.NODE_ENV === 'production' ? config.production.port : config.development.port;

const app = express();

/** VIEW ENGINE SETUP **/
app.set('views', [
    path.join(__dirname, 'src/views'),
    path.join(__dirname, 'src/views/lots'),
    path.join(__dirname, 'src/views/eleves'),
    path.join(__dirname, 'src/views/csvScripts'),
    path.join(__dirname, 'src/views/templates'),
    path.join(__dirname, 'src/views/tirage'),
]);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

/** ROUTES **/
const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const aboutRouter = require('./src/routes/about');
const lotsRouter = require('./src/routes/lotsRouter');
const elevesRouter = require('./src/routes/elevesRouter');
const csvScriptsRouter = require('./src/routes/csvScriptRouter');
const tirageRouter = require('./src/routes/tirageRouter');

/** USE FOR ROUTES **/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/lots', lotsRouter);
app.use('/eleves', elevesRouter);
app.use('/csvScripts', csvScriptsRouter);
app.use('/tirage', tirageRouter);


/** DATABASE **/
sequelize.sync()
    .then(() => {
        console.log('Connexion à la base de données réussie !');
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données :', err);
    });

/** APP LAUNCH **/
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

    console.log(`Utilisation de la configuration pour l'environnement: ${process.env.NODE_ENV}`);
    console.log({
        host: config[process.env.NODE_ENV || 'development'].host,
        database: config[process.env.NODE_ENV || 'development'].database,
        username: config[process.env.NODE_ENV || 'development'].username,
        password: config[process.env.NODE_ENV || 'development'].password,
    });
});


/** CATCH 404 AND FORWARD TO ERROR HANDLER **/
app.use(function(req, res, next) {
  next(createError(404));
});


/** ERROR HANDLER **/
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
