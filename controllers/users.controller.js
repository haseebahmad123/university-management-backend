const jwt = require('jsonwebtoken');

const { User } = require('../models');

const BaseController = require('./base.controller');
const Controller = new BaseController(User, 'User');

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


const getAll = async(_req, _res) => Controller.getAll(_req, _res);

const getOne = async(_req, _res) => Controller.getOne(_req, _res);

const create = async(_req, _res) => {
    return Controller.create(_req, _res, { 
        email: _req.body.email,
        mobile: _req.body.mobile,
        password: _req.body.password 
    }, async (user) => {
        if(_req.body.categories && Array.isArray(_req.body.categories)) {
            await user.setCategories(_req.body.categories);
        }
        if(_req.body.vendors && Array.isArray(_req.body.vendors)) {
            await user.setVendors(_req.body.vendors);
        }

        return user.reload();
    });
};

const update = async(_req, _res) => {
    const input = filterNonEmptyValues({ 
        email: _req.body.email,
        mobile: _req.body.mobile,
        password: _req.body.password 
    });

    return Controller.update(_req, _res, input , async (user) => {
        if(_req.body.categories && Array.isArray(_req.body.categories)) {
            await user.setCategories(_req.body.categories);
        }
        if(_req.body.vendors && Array.isArray(_req.body.vendors)) {
            await user.setVendors(_req.body.vendors);
        }

        return user.reload();
    });
};

const destroy = async(_req, _res) => Controller.destroy(_req, _res);

const restore = async(_req, _res) => Controller.restore(_req, _res);

const forceDelete = async(_req, _res) => Controller.forceDelete(_req, _res);

const register = async(_req, _res) => {
    return Controller.create(_req, _res, { 
        email: _req.body.email,
        mobile: _req.body.mobile,
        password: _req.body.password 
    }, async (user) => {
        if(user) {
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
    
            user._extraValues = {token};
        }

        return user;
    });
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    destroy,
    restore,
    forceDelete,
    register
};