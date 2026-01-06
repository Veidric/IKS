const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const config = require("./config");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");


const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})


const upload = multer({ storage: storage });




const pool = mysql.createPool(config.pool);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const root = __dirname
console.log(__dirname)
app.use(morgan("dev"));

//dozvoljavanje konekcije i postavke corsa
app.use(cors());

const admRouter = require('./routes/admin')(express, pool, upload, jwt, config.secret);
app.use('/api/admin', admRouter);

const apiRouter = require("./routes/api")(express, pool, upload, root, jwt, config.secret);
app.use("/api", apiRouter);

const authRouter = require("./routes/auth")(express, pool, upload, jwt, config.secret);
app.use("/api/auth", authRouter);

//pokretanje servera na portu 8080, promjeniti u config.js ako je potrebno
app.listen(config.port, () => {
  console.log("Server started on port:", config.port, ".");
});
