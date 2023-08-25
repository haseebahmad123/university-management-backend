const { Faqs, Sequelize } = require("../models");
const BaseController = require("./base.controller");
const Controller = new BaseController(Faqs, "faqs");


const create = async (_req, _res) => {
  const body = {
    question: _req.body.question,
    answer: _req.body.answer,
  };
  return Controller.create(_req, _res, body);
};

const getAll = async (_req, _res) => {
  return await Controller.getAll(_req, _res);
};

const getOne = async (_req, _res) => Controller.getOne(_req, _res);

module.exports = {
  create,
  getAll,
  getOne,
};