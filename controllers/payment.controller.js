const paymentService = require("../services/payment");
const PaymentService = new paymentService(process.env.FLUTTER_WAVE_SECRET);

const createPaymentLink = async (_req, _res, payload) => {
  try {
    const res = await PaymentService.createPaymentLink(payload);

    return _res.status(200).send(res);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createPaymentLink,
};
