'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jelo extends Model {
    static associate({Kategorija, Sastojak, StavkaNarudzbine, Narudzbina}) {
      this.belongsTo(Kategorija, {foreignKey: "kategorija_id", as: "kategorija"});
      this.hasMany(StavkaNarudzbine, {foreignKey: "jelo_id", as: "stavke"});
      this.belongsToMany(Sastojak, {foreignKey: "jelo_id", as: "sastojci", through:"JeloSastojak"});
      this.belongsToMany(Narudzbina, {foreignKey: "jelo_id", as: "jela", through:"JeloSastojak"});
    }
  }
  Jelo.init({
    naziv: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false
    }, 
    opis: {
      type: DataTypes.TEXT,
      allowNull: true
    }, 
    cena: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    kategorija_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  
  }, {
    sequelize,
    modelName: 'Jelo',
  });
  return Jelo;
};