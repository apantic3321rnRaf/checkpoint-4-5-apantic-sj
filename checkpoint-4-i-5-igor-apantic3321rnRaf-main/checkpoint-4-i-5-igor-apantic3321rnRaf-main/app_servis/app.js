const express = require('express');
const path = require('path')
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const cors = require("cors");
require('dotenv').config();

const app = express();

function getCookies(req) {
    console.log("req.headers.cookie: "+req.headers.cookie);
    if (req.headers.cookie == null) return {};


    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};


    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });


    return parsedCookies;
};

function authToken(req, res, next) {
    console.log('Uso sam u authToken');
    const cookies = getCookies(req);
    console.log("Cookies autentifikacija: " + JSON.stringify(cookies));
    const token = cookies['token'];
    console.log("Token autentifikacija: " + token);
    if (token == null) return res.redirect(301, '/admin/login/');
    const tokenParts = token.split(' ');
    console.log("Token parts[0]: " + tokenParts[0]);
    console.log("Token parts[1]: " + tokenParts[1]);
    jwt.verify(tokenParts[0], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (tokenParts[1]==1) {
            req.user = user;
            next();
        } 
        else {
            res.clearCookie(token);
            return res.redirect(301, '/admin/login/');
        }

        
    });
}

app.use(cors({
    origin: ['http://localhost:8000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.get('/admin/', authToken, (req, res) => {
    console.log("Uso sam u get admin");
    console.log("Auth token je " + JSON.stringify(req.user));
    if (req.user) {
        res.sendFile('index.html', { root: './static/admin' });
    } else {
        res.redirect(301, '/admin/login/');
    }
});


app.get('/admin/login/', (req, res) => {
    console.log("Uso sam u get login");
    res.sendFile('login.html', { root: './static/admin' });
});



app.use( express.static( path.join(__dirname, 'static') ) );

const BP = require('body-parser');
const { use } = require('../api_servis/routes/jelo');
app.use('/novo-jelo', BP.urlencoded({extended: false}));

app.post("/novo-jelo", (req, res) => {
    
    const shema = Joi.object().keys({
        naziv: Joi.string().trim().min(5).max(25).required(),
        opis: Joi.string().trim().min(1).required(),
        kategorija: Joi.string().trim().min(0).required(),
        cena: Joi.number().greater(0).required()
    });
    const {error, succ} = shema.validate(req.body);
    if(error){
        res.send("Greska: " + error.details[0].message);
	    return;
    } else {
        //res.send("Poruka je poslana, očekujte odgovor");
        const fs=require("fs");
        req.body.opis.replace(/\r?\n|\r/g, '<br>');
        fs.appendFile("jela.txt", 
                 JSON.stringify(req.body) + '\n', 
                 function(err, succ){
                     res.send("Poruka je poslana, očekujte odgovor uskoro");
                 }
        );
    }
    

})
app.get("/jela", (req, res) => {
    const jela = [];
    const fs=require("fs");
    fs.readFile('jela.txt', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send({ error: "Greška" });
          return;
        }
        const redovi = data.split('\n');
        for(let i=0; i<redovi.length-1; i++){
            let obj = JSON.parse(redovi[i].trim());
            jela.push(obj);
        }
        res.json(jela);
        
        
      });
      
})





app.listen(8000);