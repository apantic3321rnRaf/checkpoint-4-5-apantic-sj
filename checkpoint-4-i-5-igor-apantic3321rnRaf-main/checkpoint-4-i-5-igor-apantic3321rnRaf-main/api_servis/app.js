const express = require('express');
const cors = require("cors");
const { sequelize, Jelo, Kategorija, JeloSastojak, Sastojak, StavkaNarudzbine, Narudzbina } = require("./models");
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
const corsOptions = {
	origin: ['http://localhost:8000', 'http://localhost:8080', 'http://127.0.0.1:8000']
  };
  app.use(cors(corsOptions));
  /**
   * app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'static', 'index.html'));
});
   */

app.options('/narudzbina/nova-narudzbina', (req, res) => {
   res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   res.header('Access-Control-Allow-Credentials', true);
   res.status(200).send();
 });


app.use(express.json());

const jeloRoutes = require("./routes/jelo.js");
app.use("/jelo", jeloRoutes);

const kategorijaRoutes = require("./routes/kategorija.js");
app.use("/kategorija", kategorijaRoutes);

const sastojakRoutes = require("./routes/sastojak.js");
app.use("/sastojak", sastojakRoutes);

const narudzbinaRoutes = require("./routes/narudzbina.js");
app.use("/narudzbina", narudzbinaRoutes);

app.put("/promeni-cenu/:id", authAdmin, async (req, res) => {
   try {
      const jelo = await Jelo.findByPk(req.params.id);  //iz url
      if (!jelo) {
         return res.status(404).json({ error: "Jelo nije pronađeno" });
      }
      jelo.cena = req.body.cena;  
      jelo.save();
      console.log("Updated jelo:", jelo);
      return res.json(jelo);  
   } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Greska", data: err });
   }
});



app.listen({ port:9000 }, async () => {
	console.log("Started server on localhost:9000");
	await sequelize.authenticate();
	console.log("DB synced");
});


 
