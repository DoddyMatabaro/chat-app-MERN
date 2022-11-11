const  express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const cors = require('cors')
const passport = require('passport');
const session = require('express-session');

require('dotenv').config();

const password = process.env.PASS_DB;
const user = process.env.USER_DB;
const PORT = process.env.PORT || 9000;

const authRoutes = require('./routes/auth');

const app = express();

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use('/api/v1', authRoutes);
app.get('*', (req,res) => {
  res.json({
      message: "This API does not exist"
  });
});
app.use(express.static(path.join(__dirname, 'public')));

mongoose
.connect(`mongodb+srv://${user}:${password}@atlascluster.zeaqo3p.mongodb.net/?retryWrites=true&w=majority`, 
  {useNewUrlParser:true,
  useUnifiedTopology:true})
.then(result =>{
  console.log("connexion reussie")
  app.listen(PORT);
})
.catch(err=>{
  console.error(err)
});