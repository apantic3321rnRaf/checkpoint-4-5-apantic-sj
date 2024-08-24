'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sastojak extends Model {
    static associate({Jelo}) {
      this.belongsToMany(Jelo, {foreignKey: "sastojak_id", as: "sastojci", through:"JeloSastojak"});
    }
  }
  Sastojak.init({
    naziv: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Sastojak',
  });
  return Sastojak;
};