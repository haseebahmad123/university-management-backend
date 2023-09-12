const express = require("express");
const router = express.Router();

require("./auth.routes")(router);
require("./users.routes")(router);
require("./assignment.routes")(router);
require("./studentAssognment.routes")(router);



module.exports = router;
