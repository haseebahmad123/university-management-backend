const express = require("express");
const router = express.Router();

require("./auth.routes")(router);
require("./users.routes")(router);
require("./payment.routes")(router);
require("./faqs.routes")(router);
require("./order.routes")(router);
require("./conversions.routes")(router);
require("./products.routes")(router);

module.exports = router;
