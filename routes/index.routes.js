const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");

require("./auth.routes")(router);
require("./users.routes")(router);
require("./payment.routes")(router);
require("./order.routes")(router);
// router.use(auth);

require("./products.routes")(router);

module.exports = router;
