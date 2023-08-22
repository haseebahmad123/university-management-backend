const { body } = require("express-validator");

const Controller = require("../controllers/payment.controller");

module.exports = (router) => {
  router.post(
    "/payment/create-link",
    // [
    //   body("email")
    //     .not()
    //     .isEmpty()
    //     .withMessage("Email is required")
    //     .bail()
    //     .custom(async (email) => {
    //       const record = await User.findOne({
    //         where: { email },
    //         paranoid: false,
    //       });
    //       if (record) {
    //         throw new Error("Email already exists");
    //       }
    //       return true;
    //     }),
    //   body("mobile")
    //     .not()
    //     .isEmpty()
    //     .withMessage("Mobile is required")
    //     .bail()
    //     .custom(async (mobile) => {
    //       const record = await User.findOne({
    //         where: { mobile },
    //         paranoid: false,
    //       });
    //       if (record) {
    //         throw new Error("Mobile already exists");
    //       }
    //       return true;
    //     }),
    //   body("password").not().isEmpty().withMessage("Password is required"),
    // ],
    Controller.createPaymentLink
  );
};
