const { body } = require("express-validator");

const validationMiddleware = require("../middlewares/validations.middleware");
const upload = require("../middlewares/upload.middleware");
const Controller = require("../controllers/conversion.controller");

module.exports = (router) => {
  router.get("/conversions", Controller.getAll);

  router.post(
    "/conversions/create",
    [
      body("source_currency")
        .not()
        .isEmpty()
        .withMessage("source_currency is required"),

      body("target_currency")
        .not()
        .isEmpty()
        .withMessage("target_currency is required"),

      body("conversion_rate")
        .not()
        .isEmpty()
        .withMessage("conversion_rate is required"),
    ],
    validationMiddleware,
    Controller.create
  );
  router.put(
    "/conversions/:id",
    [
      body("conversion_rate")
        .not()
        .isEmpty()
        .withMessage("conversion_rate is required"),
    ],
    validationMiddleware,
    Controller.update
  );
  router.delete("/conversions/:id", Controller.destroy);
};
