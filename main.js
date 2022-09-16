// required medules:
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const dataBase =  require(path.join(__dirname,'database','mongoDB.js'));
// server:
const app = express();
const server = require('http').createServer(app);

// middlewares:
app.use(cors());
app.use(express.json());
app.use(express.static(path.join('public')));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.disable('x-powered-by');
app.use(require('./middlewares/readReqs.js'));

// routers:
app.use(require(path.join(__dirname,'routers','home.js')));
app.use('/sign',require(path.join(__dirname,'routers','sign.js')));
app.use('/register',require(path.join(__dirname,'routers','register.js')));

// run server:
const port = process.env.PORT || 8000;
server.listen(port,()=>{
    console.log(`Your server is runing... \nin port: ${port}`);
})