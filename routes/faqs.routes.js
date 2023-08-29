const { body } = require('express-validator');

const validationMiddleware = require('../middlewares/validations.middleware');
const Controller = require('../controllers/faqs.controller');

module.exports = (router) => {
  router.get("/faqs", Controller.getAll);
  router.get("/faqs/:id", Controller.getOne);
  router.delete("/faqs/:id", Controller.destroy);
  router.put(
    "/faqs/:id",
    [
      body("question")
        .not()
        .isEmpty()
        .withMessage("Question is required"),
      body("answer")
        .not()
        .isEmpty()
        .withMessage("Answer is required"),
    ],
    validationMiddleware,
    Controller.update
  );
  router.post(
    "/faqs/create",
    [
      body("question")
        .not()
        .isEmpty()
        .withMessage("Question is required"),
      body("answer")
        .not()
        .isEmpty()
        .withMessage("Answer is required"),
    ],
    validationMiddleware,
    Controller.create
  );
}