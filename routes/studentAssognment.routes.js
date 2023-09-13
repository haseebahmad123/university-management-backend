const { body } = require('express-validator');

const validationMiddleware = require('../middlewares/validations.middleware');
const Controller = require('../controllers/studentAssignment.controller');


const { authMiddleware } = require('../middlewares/auth.middleware');

module.exports = (router) => {
   
    //createUser
    router.post('/studentassignment/assign', [
        body('assignment_id').not().isEmpty().withMessage('assignment_id is required').bail(),        
    ], validationMiddleware, authMiddleware, Controller.createStudentAssignment);

    router.get('/studentassignment/getAll', [
    ], validationMiddleware, authMiddleware, Controller.getStudentsAssignments);

}

