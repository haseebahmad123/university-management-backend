const { body } = require('express-validator');

const validationMiddleware = require('../middlewares/validations.middleware');
const Controller = require('../controllers/auth.controller');

module.exports = (router) => {
    router.post('/login', [
        body('email').not().isEmpty().withMessage('Email is required'),
        body('password').not().isEmpty().withMessage('Password is required'),
    ], validationMiddleware, Controller.login);
}