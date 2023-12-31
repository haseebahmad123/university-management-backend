const CrudService = require("../services/crud");

class BaseController {
  constructor(model, modelName) {
    this.crudService = new CrudService(model);
    this.modelName = modelName;
  }

    async getAll(_req, _res) {
        const records = await this.crudService.getAll(_req.query);

        return _res.json({ records });
    }

    async getOne(_req, _res) {
        const record = await this.crudService.getById(_req.query.id);

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
      let record = await this.crudService.update(_req.query.id, body);
  
     
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