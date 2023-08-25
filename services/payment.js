const axios = require("axios");

class PaymentService {
  constructor(flwSecretKey) {
    this.flwSecretKey = flwSecretKey;
  }

  async createPaymentLink(payload) {
    const url = "https://api.flutterwave.com/v3/payments";

    const headers = {
      Authorization: `Bearer ${this.flwSecretKey}`,
    };

    const requestBody = {
      tx_ref: payload.tx_ref,
      amount: payload.total_amount,
      currency: "USD",
      redirect_url: "https://webhook.site/4fa69fbe-32c4-46d2-a11c-535c5b20339d",
      customer: payload.customer,
      customizations: payload.customizations,
    };

    try {
      const response = await axios.post(url, requestBody, { headers });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = PaymentService;
