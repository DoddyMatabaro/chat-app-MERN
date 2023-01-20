const  express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
app.use(cors());
const server = http.createServer(app);
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

app.use('/public', express.static('public'));

const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});
const Message = require('./models/message');
require('dotenv').config()

const password = process.env.PASS_DB;
const user = process.env.USER_DB;
const PORT = process.env.PORT || 9000;

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

mongoose
.connect(`mongodb+srv://${user}:${password}@atlascluster.zeaqo3p.mongodb.net/?retryWrites=true&w=majority`, 
  {useNewUrlParser:true,
  useUnifiedTopology:true})
.then(result =>{
  console.log("connexion reussie");
})
.catch(err=>{
  console.error(err)
});

io.on('connection', (socket)=>{
  console.log("user  connected");

  socket.on('send', (data)=>{
        const res = new Message({
          message:{
              text: data.text,
          },
          users: [
              data.from,
              data.to
            ],
            sender:data.from,
        });

        res.save().then(resp=>{
          const newMessage = {
                fromSelf: data.from === resp.sender.toString(),
                message: resp.message.text,
          } 
          io.emit('sendToAll', newMessage);
        }).catch((e)=>{
          console.log(e.message);
        });
    socket.emit('connection', null);
  })
})

server.listen(PORT, ()=>{
  console.log(`Server started on Port ${PORT}`);
});

