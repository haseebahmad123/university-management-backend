const { Conversion } = require("../models");

const BaseController = require("./base.controller");
const Controller = new BaseController(Conversion, "Conversion");

function filterNonEmptyValues(obj) {
  const filteredObj = {};
  for (const key in obj) {
    const value = obj[key];
    if (value) {
      filteredObj[key] = value;
    }
  }
  return filteredObj;
}

const getAll = async (_req, _res) => Controller.getAll(_req, _res);

const create = async (_req, _res) => {
  return Controller.create(_req, _res, {
    source_currency: _req.body.source_currency,
    target_currency: _req.body.target_currency,
    conversion_rate: _req.body.conversion_rate,
  });
};

const update = async (_req, _res) => {
  const input = filterNonEmptyValues({
    source_currency: _req.body.source_currency,
    target_currency: _req.body.target_currency,
    conversion_rate: _req.body.conversion_rate,
  });

  return Controller.update(_req, _res, input);
};

const destroy = async (_req, _res) => Controller.destroy(_req, _res);

module.exports = {
  getAll,
  create,
  update,
  destroy,
};
