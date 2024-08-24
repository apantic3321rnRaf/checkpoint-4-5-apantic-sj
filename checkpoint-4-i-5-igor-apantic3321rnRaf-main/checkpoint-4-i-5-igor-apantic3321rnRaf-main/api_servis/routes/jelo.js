const express = require("express");
const { sequelize, Kategorija, JeloSastojak, Sastojak, StavkaNarudzbine, Narudzbina, Jelo } = require("../models");
const route = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

function authToken(req, res, next) {
     const authHeader = req.headers['authorization'];
     console.log("AuthHeader: " + authHeader);
     const token = authHeader && authHeader.split(' ')[1];
     console.log("Token: " + token);
     console.log("Cookies: " + JSON.stringify(req.cookies));
     if (token == null) {
          console.log("Token verification failed");
          return res.status(401).json({ msg: err });
     }

     jwt.verify(token.slice(6), process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          if (err) return res.status(403).json({ msg: err });
          req.user = user;
          next();
     });
}

function authAdmin(req, res, next) {
     const authHeader = req.headers['authorization'];
     console.log("AuthHeader: " + authHeader);
     const token = authHeader && authHeader.split(' ')[1];
     console.log("Token: " + token);
     const isAdmin = authHeader.split(' ')[2];
     console.log("Cookies: " + JSON.stringify(req.cookies));
     if (token == null) {
          console.log("Token verification failed");
          return res.status(401).json({ msg: err });
     }

     jwt.verify(token.slice(6), process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          if (err || isAdmin==0) return res.status(403).json({ msg: err });
          req.user = user;
          next();
     });
}
route.use(authToken);

route.get("/", async (req, res) => {
     try {
          console.log(req.body);
          const jela = await Jelo.findAll({
               include: ['kategorija']
          });
          return res.json(jela);
     } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Greska", data: err });
     }
});

route.get("/:id", async (req, res) => {
     try {
          const jelo = await Jelo.findByPk(req.params.id, {
               include: [{ model: Sastojak, as: 'sastojci' }]
          });
          return res.json(jelo);
     } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Greska", data: err });
     }
});


route.post("/novo-jelo/", authAdmin, async (req, res) => {
     try {

          const novi = await Jelo.create(req.body);
          console.log("Novo Jelo dodato u bazu: ", novi);
          return res.json(novi);

     } catch (err) {
          console.log(err);
          //res.status(500).json({ error: "Greška", data: err});
          return res.status(500).json({ error: "Greška prilikom kreiranja novog jela", data: err.message });
     }
});


route.put("/:id", authAdmin, async (req, res) => {
     try {
          const jelo = await Jelo.findByPk(req.params.id);
          jelo.naziv = req.body.naziv;
          jelo.opis = req.body.opis;
          jelo.cena = req.body.cena;
          jelo.kategorija_id = req.body.kategorija_id;
          if (req.body.sastojci) {
               await jelo.setSastojci(req.body.sastojci);
          }

          jelo.save();
          return res.json(jelo);
     } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Greska", data: err });
     }
});

route.delete("/:id", authAdmin, async (req, res) => {
     try {
          const jelo = await Jelo.findByPk(req.params.id);
          jelo.destroy();
          return res.json(jelo.id);

     } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Greska", data: err });
     }
});


