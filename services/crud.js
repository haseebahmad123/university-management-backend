const { Op } = require('sequelize');

class CrudService {
  constructor(model) {
    this.model = model;
  }

  async getFilteredOrders(query) {
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);
    const filteredReports = await this.model.findAll({
      where: {
        created_at: {
          [Op.gte]: startDate,
          [Op.lte]: new Date(endDate.getTime() + 24 * 60 * 60 * 1000) // Add 1 day to include the entire end date
        }
      }
    });
    return filteredReports;
  }
  async getAll(query) {
    const limit = query.perPage ? parseInt(query.perPage) : 10;
    const page = query.page ? parseInt(query.page) : 1;
    const offset = (page - 1) * limit;
    let where = {};
    if(query.where) {
      where = query.where;
    }

    if (query.search) {
      where[Op.or] = Object.keys(this.model.rawAttributes).filter(attr => this.model.rawAttributes[attr].type.key === 'STRING' || this.model.rawAttributes[attr].type.key === 'TEXT').map(attr => ({ [attr]: { [Op.like]: `%${query.search}%` } }));
    }

    if(query.trashed === undefined) {
      query.trashed = 0;
    }

    const include = []; // array to hold associations

    // Add any necessary associations here
    if (this.model.associations) {
      Object.keys(this.model.associations).forEach(key => {
        include.push({ model: this.model.associations[key].target, as: key }); // add association to include array
      });
    }

    const { count, rows } = await this.model.findAndCountAll({
      where,
      limit,
      offset,
      paranoid: query.trashed == 0,
      include
    });

    return {
      data: rows,
      pagination: {
        page,
        totalPages: Math.ceil(count / limit),
        totalRecords: count,
      },
    };
  }

  async getById(id, _options = {}) {
    const include = [];
    if (this.model.associations) {
      Object.keys(this.model.associations).forEach(key => {
        include.push({ model: this.model.associations[key].target, as: key }); // add association to include array
      });
    }

    return this.model.findByPk(id, { ..._options, include });
  }

  async create(data, _options = {}) {
    const record = await this.model.create(data, { ..._options });

    const include = [];
    if (this.model.associations) {
      Object.keys(this.model.associations).forEach(key => {
        include.push({ model: this.model.associations[key].target, as: key }); // add association to include array
      });
    }

    return this.model.findByPk(record.id, { ..._options, include });
  }

  async update(id, data, _options = {}) {
    const include = [];
    if (this.model.associations) {
      Object.keys(this.model.associations).forEach(key => {
        include.push({ model: this.model.associations[key].target, as: key }); // add association to include array
      });
    }
    const record = await this.model.findByPk(id, { ..._options, include });

    console.log('record', record);
    if (!record) {
      return null;
    }

    await record.update(data, { ..._options });

    await record.reload();

    return record;
  }

  async destroy(id, _options = {}) {
    const include = [];
    if (this.model.associations) {
      Object.keys(this.model.associations).forEach(key => {
        include.push({ model: this.model.associations[key].target, as: key }); // add association to include array
      });
    }

    const record = await this.model.findByPk(id, { ..._options, include });

    if (!record) {
      return null;
    }

    await record.destroy();

    return record;
  }

  async restore(id, _options = {}) {
    const include = [];
    if (this.model.associations) {
      Object.keys(this.model.associations).forEach(key => {
        include.push({ model: this.model.associations[key].target, as: key }); // add association to include array
      });
    }
    const record = await this.model.findByPk(id, { paranoid: false, ..._options, include });

    if (!record) {
      return null;
    }

    await record.restore();

    return record;
  }

  async delete(id, _options = {}) {
    const include = [];
    if (this.model.associations) {
      Object.keys(this.model.associations).forEach(key => {
        include.push({ model: this.model.associations[key].target, as: key }); // add association to include array
      });
    }
    const record = await this.model.findByPk(id, { paranoid: false, ..._options, include });

    if (!record) {
      return null;
    }

    await record.destroy({ force: true });

    return record;
  }
}

module.exports = CrudService;
