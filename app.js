const  express = require('express');

const app = express();

const PORT = process.env.PORT || 9000;

app.use(express.json());


const authRoutes = require('./routes/auth');

app.use('/', authRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });