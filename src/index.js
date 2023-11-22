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

//middleware
const verifyToken = require('./middlewares/verifyToken');
const permission = require('./middlewares/permission');

const usersRouter = require('./routes/users');
const penjualRouter = require('./routes/penjual');

app.get('/', (req, res) => {
    res.json('JajanJalan REST API');
});

app.use('/users', usersRouter);
app.use('/penjual', penjualRouter);