const  express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const mysql      = require('mysql');
// const {mongoConnect, getDB} = require('./util/database');
require('dotenv').config()
const SQLiteStore = require('connect-sqlite3')(session);
const password = process.env.PASS_DB;
const user = process.env.USER_DB;
const PORT = process.env.PORT || 9000;

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(passport.initialize());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  store: new SQLiteStore({ db: 'sessions.db', dir: './util'})
}));
app.use(passport.authenticate('session'));
app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(PORT);


// mongoose
// .connect(`mongodb+srv://${user}:${password}@atlascluster.zeaqo3p.mongodb.net/?retryWrites=true&w=majority`)
// .then(result =>{
//   app.listen(PORT);
// })
// .catch(err=>{
//   console.error(err)
// });