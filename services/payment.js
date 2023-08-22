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
      tx_ref: `TRX-${Date.now()}`,
      amount: 10,
      currency: "USD",
      redirect_url: "https://webhook.site/4fa69fbe-32c4-46d2-a11c-535c5b20339d",
      customer: {
        email: "user@gmail.com",
        phonenumber: "080****4528",
        name: "Yemi Desola",
      },
      customizations: {
        title: "Pied Piper Payments",
        logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png",
      },
    };

    console.log("url =>", url);
    console.log("headers =>", headers);
    console.log("requestBody =>", requestBody);

    try {
      const response = await axios.post(url, requestBody, { headers });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = PaymentService;
