const { body } = require('express-validator');

const validationMiddleware = require('../middlewares/validations.middleware');
const Controller = require('../controllers/assignments.controller');
const { Assignment } = require('../models');

const { authMiddleware } = require('../middlewares/auth.middleware');

module.exports = (router) => {
   
    //createUser
    router.post('/assignment/create', [
        body('name').not().isEmpty().withMessage('name is required').bail()
        .custom(async (name) => {
            const record = await Assignment.findOne({ where: { name }, paranoid: false });
            if (record) {
                throw new Error('assignment already exists');
            }
            return true;
        }),
        
        body('due_date').not().isEmpty().withMessage('due_date is required'),
        body('description').not().isEmpty().withMessage('description is required'),
    ], validationMiddleware, authMiddleware, Controller.createAssignment);

    router.get('/assignment/getAll', [
    ], validationMiddleware, authMiddleware, Controller.getTeacherAssignments);

    router.put('/assignment/update', [
    ], validationMiddleware, authMiddleware, Controller.updateAssignment);
}

