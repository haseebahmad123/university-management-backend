const { body, query } = require("express-validator");
const validationMiddleware = require("../middlewares/validations.middleware");
const Controller = require("../controllers/order.controller");
const auth = require("../middlewares/auth.middleware");

module.exports = (router) => {
  router.get("/orders", Controller.getAll);
  router.get(
    "/orders/generate-pdf",
    [
      query("startDate").not().isEmpty().withMessage("Start Date is required"),
      query("endDate").not().isEmpty().withMessage("End Date is required"),
    ],
    validationMiddleware,
    auth, 
    Controller.generatePDF);
  router.get(
    "/orders/generate-excel",
    [
      query("startDate").not().isEmpty().withMessage("Start Date is required"),
      query("endDate").not().isEmpty().withMessage("End Date is required"),
    ],
    validationMiddleware,
    auth, 
    Controller.generateExcel);
  router.get(
    "/orders/generate-csv",
    [
      query("startDate").not().isEmpty().withMessage("Start Date is required"),
      query("endDate").not().isEmpty().withMessage("End Date is required"),
    ],
    validationMiddleware,
    auth,
    Controller.generateCSV);
  router.get("/orders/:id", Controller.getOne);
  router.put(
    "/orders/:id",
    [
      body("firstname").not().isEmpty().withMessage("FirstName is required"),
      body("lastname").not().isEmpty().withMessage("LastName is required"),
      body("email").not().isEmpty().withMessage("Email is required"),
      body("phone_number")
        .not()
        .isEmpty()
        .withMessage("Phone Number is required"),
      body("address").not().isEmpty().withMessage("Address is required"),
      body("destination_country")
        .not()
        .isEmpty()
        .withMessage("Destination Country is required"),
      body("total_amount")
        .not()
        .isEmpty()
        .withMessage("Total Amount is required"),
      body("payment_by_flutterwave")
        .not()
        .isEmpty()
        .withMessage("PaymentByFlutterwave  is required"), //Need Fix

      body("order_note")
        .not()
        .isEmpty()
        .withMessage("Destination Country is required"),
      // Validate the order_detail array
      body("order_detail")
        .isArray({ min: 1 }) // Ensure it's an array and has at least one element
        .withMessage("Order details must be an array with at least one element")
        .custom((value) => {
          // Validate each element in the array
          for (const detail of value) {
            if (!detail.bundle_name) {
              throw new Error("bundle_name is required");
            }
            if (!detail.quantity) {
              throw new Error("quantity is required");
            }
            if (!detail.amount) {
              throw new Error("amount is required");
            }
          }
          return true; // Validation successful
        }),
    ],
    validationMiddleware,
    auth,
    Controller.update
  );
  router.post(
    "/order/create",
    [
      body("firstname").not().isEmpty().withMessage("FirstName is required"),
      body("lastname").not().isEmpty().withMessage("LastName is required"),
      body("email").not().isEmpty().withMessage("Email is required"),
      body("phone_number")
        .not()
        .isEmpty()
        .withMessage("Phone Number is required"),
      body("address").not().isEmpty().withMessage("Address is required"),
      body("destination_country")
        .not()
        .isEmpty()
        .withMessage("Destination Country is required"),
      body("total_amount")
        .not()
        .isEmpty()
        .withMessage("Total Amount is required"),
      body("payment_by_flutterwave")
        .not()
        .isEmpty()
        .withMessage("PaymentByFlutterwave  is required"), //Need Fix

      body("order_note")
        .not()
        .isEmpty()
        .withMessage("Destination Country is required"),
      // Validate the order_detail array
      body("order_detail")
        .isArray({ min: 1 }) // Ensure it's an array and has at least one element
        .withMessage("Order details must be an array with at least one element")
        .custom((value) => {
          // Validate each element in the array
          for (const detail of value) {
            if (!detail.bundle_name) {
              throw new Error("bundle_name is required");
            }
            if (!detail.quantity) {
              throw new Error("quantity is required");
            }
            if (!detail.amount) {
              throw new Error("amount is required");
            }
          }
          return true; // Validation successful
        }),
    ],
    validationMiddleware,
    Controller.create
  );
};
