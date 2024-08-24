const express = require('express');
const cors = require('cors');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();


const app = express();


var corsOptions = {
    origin: ['http://127.0.0.1:8000','http://localhost:8000/admin','http://localhost:8000','http://localhost:8080','http://localhost:8080/login'],
    optionsSuccessStatus: 200,
    credentials: true,
}


app.use(express.json());
app.use(cors(corsOptions));


app.post('/register', (req, res) => {
    const obj = {
        username: req.body.username,
        email: req.body.email,
        admin: false,
        password: bcrypt.hashSync(req.body.password, 10)
    };
    Users.create(obj).then( rows => {
        const usr = {
            userId: rows.id,
            user: rows.username
        };
        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'None', 
            secure: true, 
        });
        res.json({ token: token});
    }).catch( err => res.status(500).json(err) );

});


app.post('/login', (req, res) => {
    console.log('Received login request:', req.body); 
    Users.findOne({ where: { username: req.body.username } })
      .then( usr => {
        if (!usr) {
            return res.status(400).json({ msg: "User not found" });
        }
        if (bcrypt.compareSync(req.body.password, usr.password)) {
            const obj = {
                userId: usr.id,
                user: usr.username,
            };
            const admin = usr.admin==1 ? 1 : 0;
            const token = jwt.sign(obj, 
						process.env.ACCESS_TOKEN_SECRET)+' '+admin;
            res.cookie('token', token, {
                            httpOnly: true,
                            sameSite: 'None', 
                            secure: true, 
            });
            res.json({ token: token});
        } else {
            res.status(400).json({ msg: "Invalid credentials"});
        }
      })
      .catch( err => res.status(500).json(err) );

});


app.listen({ port: 9001 }, async () => {
    await sequelize.authenticate();
});
