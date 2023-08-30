const { body } = require("express-validator");

const validationMiddleware = require("../middlewares/validations.middleware");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const Controller = require("../controllers/products.controller");

module.exports = (router) => {
  router.get("/products", Controller.getAll);
  router.get("/products/:id", Controller.getOne);
  router.post(
    "/products",
    upload,
    [
      body("product_title")
        .not()
        .isEmpty()
        .withMessage("Product title is required"),
      body("product_description")
        .not()
        .isEmpty()
        .withMessage("Product description is required"),
      body("price").not().isEmpty().withMessage("Price is required"),
    ],
    validationMiddleware,
    auth,
    Controller.create
  );
  router.put(
    "/products/:id",
    upload,
    [
      body("product_title")
        .not()
        .isEmpty()
        .withMessage("Product title is required"),
      body("product_description")
        .not()
        .isEmpty()
        .withMessage("Product description is required"),
      body("price").not().isEmpty().withMessage("Price is required"),
    ],
    validationMiddleware,
    auth,
    Controller.update
  );
  router.delete("/products/:id", auth, Controller.destroy);
};
