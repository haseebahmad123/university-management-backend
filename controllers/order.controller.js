const { Order, Sequelize } = require("../models");

const BaseController = require("./base.controller");
const Controller = new BaseController(Order, "Order");
const paymentService = require("../services/payment");
const PaymentService = new paymentService(process.env.FLUTTER_WAVE_SECRET);
const create = async (_req, _res) => {
  try {
    const orderBody = {
      firstname: _req.body.firstname,
      lastname: _req.body.lastname,
      email: _req.body.email,
      phone_number: _req.body.phone_number,
      address: _req.body.address,
      destination_country: _req.body.destination_country,
      total_amount: _req.body.total_amount,
      order_note: _req.body.order_note,
      order_detail: _req.body.order_detail,
      payment_by_flutterwave: _req.body.payment_by_flutterwave,
      order_ref: `TRX-${Date.now()}`,
      payment_receipt: (_req.file && _req.file.path ? _req.file.path.replace('public/', '') : null)
    };

    if (_req.body.payment_by_flutterwave) {
      orderBody["payment_by_flutterwave"] = _req.body.payment_by_flutterwave;
    }

    if (_req.body.payment_receipt) {
      orderBody["payment_receipt"] = _req.body.payment_receipt;
    }

    let res;
    if(_req.body.payment_by_flutterwave) {
      res = await Controller.createOrder(_req, _res, orderBody);
      const orderDetail = res.record.dataValues;
      const payload = {
        tx_ref: orderDetail.order_ref,
        total_amount: orderDetail.total_amount,
        customer: {
          email: orderDetail.email,
          phonenumber: orderDetail.phone_number,
          name: orderDetail.firstname + " " + orderDetail.lastname,
        },customizations: {
          title: "Brand for heap Payment Gateway",
          logo: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-vector%2Fcreative-hurricane-logo-template_23-2149209625.jpg%3Fw%3D2000&tbnid=VCSl-XPzGnaZWM&vet=12ahUKEwiS-cXou_eAAxUSrEwKHaj7CUwQMygOegUIARCTAQ..i&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-vector%2Fcreative-hurricane-logo-template_21077268.htm&docid=1WGZgssS_th4KM&w=2000&h=2000&q=sample%20logo%20image&ved=2ahUKEwiS-cXou_eAAxUSrEwKHaj7CUwQMygOegUIARCTAQ",
        },

      }
      const paymentDetail = await PaymentService.createPaymentLink(payload);
      return _res.status(200).send(paymentDetail);
    } else {
      res = await Controller.create(_req, _res, orderBody);
      return _res.status(200).send(res);
    }

  } catch (e) {
    console.log(e);
  }
};

const getAll = async (_req, _res) => {
  return await Controller.customGetAll(_req, _res);
};

const generatePDF = async (_req, _res) => {
  return await Controller.generatePDF(_req, _res);
}

const generateExcel = async (_req, _res) => {
  return await Controller.generateExcel(_req, _res);
}

const generateCSV = async (_req, _res) => {
  return await Controller.generateCSV(_req, _res);
}

const update = async (_req, _res) => {
  const orderBody = {
    firstname: _req.body.firstname,
    lastname: _req.body.lastname,
    email: _req.body.email,
    phone_number: _req.body.phone_number,
    address: _req.body.address,
    destination_country: _req.body.destination_country,
    total_amount: _req.body.total_amount,
    order_note: _req.body.order_note,
    order_detail: _req.body.order_detail,
    payment_by_flutterwave: _req.body.payment_by_flutterwave,
  };
  return Controller.update(_req, _res, orderBody);
};

const getOne = async (_req, _res) => Controller.customGetOne(_req, _res);

module.exports = {
  create,
  getAll,
  getOne,
  generatePDF,
  generateExcel,
  update,
  generateCSV,
};
