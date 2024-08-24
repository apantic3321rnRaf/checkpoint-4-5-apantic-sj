'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Narudzbina extends Model {
    static associate({StavkaNarudzbine}) {
      this.hasMany(StavkaNarudzbine, {foreignKey: "narudzbina_id", as: "stavke"});
      //this.belongsTo(Users, {foreignKey: "users_id", as: "user"});
    }
  }
  Narudzbina.init({
    vreme_narucivanja: {
      type: DataTypes.DATE,
      allowNull: false
    }, 
    zakazano_vreme: {
      type: DataTypes.DATE,
      allowNull: true
    }, 
    status: {
      type: DataTypes.STRING(120),
      allowNull: false
    }, 
    adresa: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    telefon: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ime_prezime: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Narudzbina',
  });
  return Narudzbina;
};