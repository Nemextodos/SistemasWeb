const express = require("express");
const db = require("./conn");
const path = require("path");
const cookieParser = require('cookie-parser');
const session = require("express-session");


const app = express();



const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

//Parse url-encoded bodies
app.use(express.urlencoded({extended:false}));
//CONVIERTE LOS DATOS DEL FORM EN JSON
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true
}));



app.set('view engine','hbs');

db.connect((error)=>{
    if(error){
        console.log(error);
    }
});

//Definir rutas
app.use('/', require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

app.listen(5000, () => {
    console.log("El servidor inicio em el puerto 5000");
});