/** PACKAGES **/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./database');

const port = 3000;
const app = express();

/** VIEW ENGINE SETUP **/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** ROUTES **/
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const aboutRouter = require('./routes/about');
const lotsRouter = require('./routes/lots');

/** USE FOR ROUTES **/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/lots', lotsRouter);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
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
