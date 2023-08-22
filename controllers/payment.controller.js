const paymentService = require("../services/payment");
const PaymentService = new paymentService(process.env.FLUTTER_WAVE_SECRET);

const createPaymentLink = async (_req, _res) => {
  console.log("createPaymentLink controller hit!");
  try {
    const res = await PaymentService.createPaymentLink();

    return _res.status(200).send(res);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createPaymentLink,
};
