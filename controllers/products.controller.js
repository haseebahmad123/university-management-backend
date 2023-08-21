const moment = require("moment-timezone");

const { Product, Sequelize } = require("../models");

const BaseController = require("./base.controller");
const Controller = new BaseController(Product, "Product");

const getAll = async (_req, _res) => {
  return Controller.getAll(_req, _res);
};

const getOne = async (_req, _res) => Controller.getOne(_req, _res);

const create = async (_req, _res) => {
  const body = {
    product_title: _req.body.product_title,
    product_description: _req.body.product_description,
    price: _req.body.price,
    image_path:
      _req.file && _req.file.path
        ? _req.file.path.replace("public/", "")
        : null,
  };
  return Controller.create(_req, _res, body);
};

const update = async (_req, _res) => {
  const body = {
    product_title: _req.body.product_title,
    product_description: _req.body.product_description,
    price: _req.body.price,
  };
  if (_req.file && _req.file.path) {
    body.image_path = _req.file.path.replace("public/", "");
  }
  return Controller.update(_req, _res, body);
};

const destroy = async (_req, _res) => Controller.destroy(_req, _res);

const restore = async (_req, _res) => Controller.restore(_req, _res);

const forceDelete = async (_req, _res) => Controller.forceDelete(_req, _res);

module.exports = {
  getAll,
  getOne,
  create,
  update,
  destroy,
  restore,
  forceDelete,
};
