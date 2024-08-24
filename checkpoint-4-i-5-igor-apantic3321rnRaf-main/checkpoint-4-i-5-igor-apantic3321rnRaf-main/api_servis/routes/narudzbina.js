const express = require("express");
const { sequelize, Jelo, StavkaNarudzbine, Narudzbina } = require("../models");
const route = express.Router();
const jwt = require('jsonwebtoken');

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

route.get("/", authAdmin, async (req, res) => {
     try {
          const narudzbina = await Narudzbina.findAll({
               include: [{ model: StavkaNarudzbine, as: 'stavke' }]
          });
          return res.json(narudzbina);
     } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Greska", data: err });
     }
});

route.get("/:id", authAdmin, async (req, res) => {
     try {
          const narudzbina = await Narudzbina.findByPk(req.params.id, {
               include: [{ model: StavkaNarudzbine, as: 'stavke' }]
          });
          return res.json(narudzbina);
     } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Greska", data: err });
     }
});


route.post("/nova-narudzbina/", async (req, res) => {
     try {
          const createdNarudzbina = await Narudzbina.create(req.body, {
               include: [{ model: StavkaNarudzbine, as: 'stavke' }]
          });
          console.log("Nova Narudzbina dodata u bazu: ", createdNarudzbina);
          return res.json(createdNarudzbina);
     } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Greska", data: err });
     }
});


route.put("/:id", authAdmin, async (req, res) => {
     try {
          const narudzbina = await Narudzbina.findByPk(req.params.id, {
               include: [{ model: StavkaNarudzbine, as: 'stavke' }]
          });
          narudzbina.vreme_narucivanja = req.body.vreme_narucivanja;
          narudzbina.status = req.body.status;
          narudzbina.adresa = req.body.adresa;
          narudzbina.telefon = req.body.telefon;
          narudzbina.ime_prezime = req.body.ime_prezime;
          if (req.body.stavke) {
               await narudzbina.setStavke(req.body.stavke);
          }

          narudzbina.save();
          return res.json(narudzbina);
     } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Greska", data: err });
     }
});

route.delete("/:id", authAdmin, async (req, res) => {
     try {
          const narudzbina = await Narudzbina.findByPk(req.params.id);
          narudzbina.destroy();
          return res.json(narudzbina.id);
     } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Greska", data: err });
     }
});
