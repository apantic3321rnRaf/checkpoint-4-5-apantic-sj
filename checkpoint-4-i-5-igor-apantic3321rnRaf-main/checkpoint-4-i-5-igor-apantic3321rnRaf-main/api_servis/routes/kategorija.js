const express = require("express");
const { sequelize, Jelo, Kategorija } = require("../models");
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

route.get("/", async (req, res) => {
     try {
          const kategorije = await Kategorija.findAll();
          return res.json(kategorije);
     } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Greska", data: err });
     }
});

route.get("/:id", authAdmin, async (req, res) => {
     try {
          const kategorija = await Kategorija.findByPk(req.params.id);
          return res.json(kategorija);
     } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Greska", data: err });
     }
});


route.post("/nova-kategorija/", authAdmin, async (req, res) => {
     try {
          const novi = await Kategorija.create(req.body);
          return res.json(novi);
     } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Greska", data: err });
     }
});


route.put("/:id", authAdmin, async (req, res) => {
     try {
          const kategorija = await Kategorija.findByPk(req.params.id);
          kategorija.naziv = req.body.naziv;

          kategorija.save();
          return res.json(kategorija);
     } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Greska", data: err });
     }
});

route.delete("/:id", authAdmin, async (req, res) => {
     try {
          const kategorija = await Kategorija.findByPk(req.params.id);
          kategorija.destroy();
          return res.json(kategorija.id);
     } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Greska", data: err });
     }
});
