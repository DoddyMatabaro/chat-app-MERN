const  express = require('express');
const mongoConnect = require('./util/database');
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 9000;

app.use(express.json());


const authRoutes = require('./routes/auth');

app.use('/', authRoutes);

mongoConnect(client =>{
    console.log(client)
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});