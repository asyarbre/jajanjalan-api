const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const usersRouter = require('./routes/handler/users');

app.get('/', (req, res) => {
    res.json('JajanJalan REST API');
});

app.use('/users', usersRouter);