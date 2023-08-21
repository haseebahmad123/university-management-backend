"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
console.log("----", process.env);
const config = require(__dirname + "/../config/config.js")[env];

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

module.exports = { sequelize, Sequelize };
