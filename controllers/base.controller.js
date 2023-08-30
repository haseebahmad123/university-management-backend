const CrudService = require("../services/crud");
const PdfGenerator = require("../services/generatePDF");
const ExcelGenerator = require("../services/generateExcel");
const CSVGenerator = require("../services/generateCSV");

class BaseController {
  constructor(model, modelName) {
    this.crudService = new CrudService(model);
    this.modelName = modelName;
  }

  async generatePDF (_req, _res) {
    const data = [];
    const records = await this.crudService.getFilteredOrders(_req.query);
    if(records.length > 0) {
      for (const record of records) {
        record.dataValues.order_detail = JSON.parse(
          record.dataValues.order_detail
        );
        data.push(record.dataValues);
      }
      const response = await PdfGenerator.generatePDF(data)
      return _res.json({ response });
    }
    return _res.json("No Order Exist in this provided date Range");
  }

  async generateExcel (_req, _res) {
    const data = [];
    const records = await this.crudService.getFilteredOrders(_req.query);
    if(records.length > 0) {
      for (const record of records) {
        record.dataValues.order_detail = JSON.parse(
          record.dataValues.order_detail
        );
        data.push(record.dataValues);
      }
      const response = await ExcelGenerator.generateExcel(data)
      return _res.json({ response });
    }
    return _res.json("No Order Exist in this provided date Range");
  }

  async generateCSV (_req, _res) {
    const data = [];
    const records = await this.crudService.getFilteredOrders(_req.query);
    if(records.length > 0) {
      for (const record of records) {
        record.dataValues.order_detail = JSON.parse(
          record.dataValues.order_detail
        );
        data.push(record.dataValues);
      }
      const response = await CSVGenerator.generateCSV(data)
      return _res.json({ response });
    }
    return _res.json("No Order Exist in this provided date Range");
  }

  async customGetAll(_req, _res) {
    const records = await this.crudService.getAll(_req.query);
    for (const record of records.data) {
      record.dataValues.order_detail = JSON.parse(
        record.dataValues.order_detail
      );
    }

    return _res.json({ records });
  }

  async customGetOne(_req, _res) {
    const record = await this.crudService.getById(_req.params.id);
    record.dataValues.order_detail = JSON.parse(record.dataValues.order_detail);

    return _res.json({ record });
  }

    async getAll(_req, _res) {
        const records = await this.crudService.getAll(_req.query);

        return _res.json({ records });
    }

    async getOne(_req, _res) {
        const record = await this.crudService.getById(_req.params.id);

        if (!record) {
            return _res.status(404).json({ error: `${this.modelName} not found` });
        }

        return _res.json({ record });
    }

    async create(_req, _res, body, cb = null) {
      try {
        let record = await this.crudService.create(body);
  
        let extra = {};
        if (cb) {
          record = await cb(record);
          if (record._extraValues) {
            extra = record._extraValues;
          }
        }
  
        return _res.status(201).json({ record, ...extra });
      } catch (err) {
        console.log('in base', err);
        return _res.status(422).json({
          errors: [
            {
              msg: err.message,
            },
          ],
        });
      }
    }

  async createOrder(_req, _res, body, cb = null) {
    try {
      let record = await this.crudService.create(body);
    //   console.log('record--------------------------------', record);
      let extra = {};
      if (cb) {
        record = await cb(record);
        if (record._extraValues) {
          extra = record._extraValues;
        }
      }

      return { record, ...extra };
    } catch (err) {
      return _res.status(422).json({
        errors: [
          {
            msg: err.message,
          },
        ],
      });
    }
  }

  async update(_req, _res, body, cb = null) {
    try {
      let record = await this.crudService.update(_req.params.id, body);

      if (!record) {
        return _res.status(404).json({ error: `${this.modelName} not found` });
      }

      if (cb) {
        record = await cb(record);
      }

      return _res.status(200).json({ record });
    } catch (err) {
      return _res.status(422).json({
        errors: [
          {
            msg: err.message,
          },
        ],
      });
    }
  }

    async destroy(_req, _res) {
        const record = await this.crudService.destroy(_req.params.id);

        if (!record) {
            return _res.status(404).json({ error: `${this.modelName} not found` });
        }

        return _res.status(200).json({ record });
    }

    async restore(_req, _res) {
        const record = await this.crudService.restore(_req.params.id);

        if (!record) {
            return _res.status(404).json({ error: `${this.modelName} not found` });
        }

        return _res.status(200).json({ record });
    }

    async forceDelete(_req, _res) {
        const record = await this.crudService.delete(_req.params.id);

        if (!record) {
            return _res.status(404).json({ error: `${this.modelName} not found` });
        }

        return _res.status(204).send();
    }
}

module.exports = BaseController;