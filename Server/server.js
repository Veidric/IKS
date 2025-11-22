const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const pool = mysql.createPool(config.pool);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(morgan('dev'));

//dozvoljavanje konekcije i postavke corsa
app.use(cors()) 

const apiRouter = require('./routes/api')(express, pool, jwt, config.secret);
app.use('/api', apiRouter);

const authRouter = require('./routes/auth')(express, pool, jwt, config.secret);
app.use('/api/auth', authRouter);



//pokretanje servera na portu 8080, promjeniti u config.js ako je potrebno
app.listen(config.port, ()=>{
    console.log("Server started on port:", config.port, ".")
})