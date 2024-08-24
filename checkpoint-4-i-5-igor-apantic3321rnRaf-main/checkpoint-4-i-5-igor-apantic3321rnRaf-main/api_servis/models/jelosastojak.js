'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JeloSastojak extends Model {
    static associate({Jelo, Sastojak}) {
      this.belongsTo(Sastojak, {foreignKey: "sastojak_id", as: "sastojak"});
      this.belongsTo(Jelo, {foreignKey: "jelo_id", as: "jelo"});
    }
  }
  JeloSastojak.init({
    jelo_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sastojak_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'JeloSastojak',
  });
  return JeloSastojak;
};