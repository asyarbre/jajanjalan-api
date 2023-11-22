const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');

const multerStorage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});
const app = express();
app.use(cors());
app.use(express.json());
app.use(multerStorage.single('image'));

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//middleware
const verifyToken = require('./middlewares/verifyToken');
const permission = require('./middlewares/permission');

const usersRouter = require('./routes/users');
const penjualRouter = require('./routes/penjual');
const menuRouter = require('./routes/menu');

app.get('/', (req, res) => {
    res.json('JajanJalan REST API');
});

app.use('/users', usersRouter);
app.use('/penjual', penjualRouter);
app.use('/menu', menuRouter);