const { Faq } = require("../models");
const BaseController = require("./base.controller");
const Controller = new BaseController(Faq, "Faq");


const create = async (_req, _res) => {
  const body = {
    question: _req.body.question,
    answer: _req.body.answer,
  };
  console.log(body);
  return Controller.create(_req, _res, body);
};

const getAll = async (_req, _res) => {
  return await Controller.getAll(_req, _res);
};

const update = async (_req, _res) => {
  const body = {
    question: _req.body?.question,
    answer: _req.body?.answer,
  };
  
  return Controller.update(_req, _res, body);
};

const destroy = async (_req, _res) => Controller.destroy(_req, _res);

const getOne = async (_req, _res) => Controller.getOne(_req, _res);

module.exports = {
  create,
  getAll,
  getOne,
  update,
  destroy,
};