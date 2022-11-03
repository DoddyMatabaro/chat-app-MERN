const  express = require('express');

const app = express();

const PORT = process.env.PORT || 9000;

express.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });