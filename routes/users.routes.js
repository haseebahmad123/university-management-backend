const { body } = require('express-validator');

const validationMiddleware = require('../middlewares/validations.middleware');
const upload = require('../middlewares/upload.middleware');
const Controller = require('../controllers/users.controller');
const { User } = require('../models');

const auth = require('../middlewares/auth.middleware');

module.exports = (router) => {
    router.post('/users/register', [
        body('email').not().isEmpty().withMessage('Email is required').bail()
        .custom(async (email) => {
            const record = await User.findOne({ where: { email }, paranoid: false });
            if (record) {
                throw new Error('Email already exists');
            }
            return true;
        }),
        body('mobile').not().isEmpty().withMessage('Mobile is required').bail()
        .custom(async (mobile) => {
            const record = await User.findOne({ where: { mobile }, paranoid: false });
            if (record) {
                throw new Error('Mobile already exists');
            }
            return true;
        }),
        body('password').not().isEmpty().withMessage('Password is required'),
    ], validationMiddleware, Controller.register);
    router.get('/users', auth, Controller.getAll);
    router.get('/users/:id', auth, Controller.getOne);
    router.post('/users', auth, [
        body('email').not().isEmpty().withMessage('Email is required').bail()
        .custom(async (email) => {
            const record = await User.findOne({ where: { email }, paranoid: false });
            if (record) {
                throw new Error('Email already exists');
            }
            return true;
        }),
        body('mobile').not().isEmpty().withMessage('Mobile is required').bail()
        .custom(async (mobile) => {
            const record = await User.findOne({ where: { mobile }, paranoid: false });
            if (record) {
                throw new Error('Mobile already exists');
            }
            return true;
        }),
        body('password').not().isEmpty().withMessage('Password is required'),
    ], validationMiddleware, Controller.create);
    router.put('/users/:id', auth, [
        body('email')
        .custom(async (email, { req }) => {
            if(email) {
                const record = await User.findOne({ where: { email }, paranoid: false });
                if (record && record.id !== parseInt(req.params.id, 10)) {
                    throw new Error('Email already exists');
                }
            }
            return true;
        }),
        body('mobile')
        .custom(async (mobile, { req }) => {
            if(mobile) {
                const record = await User.findOne({ where: { mobile }, paranoid: false });
                if (record && record.id !== parseInt(req.params.id, 10)) {
                    throw new Error('Mobile already exists');
                }
            }
            return true;
        })
    ], validationMiddleware, Controller.update);
    router.delete('/users/:id', auth, Controller.destroy);
    router.patch('/users/:id/restore', auth, Controller.restore);
    router.delete('/users/:id/force', auth, Controller.forceDelete);
}

