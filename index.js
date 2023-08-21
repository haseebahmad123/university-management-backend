require("dotenv-safe").config({
  allowEmptyValues: true,
});
const cors = require("cors");
const logger = require("morgan");
const express = require("express");
const app = express();

// const corsOptions = {
//   origin: "http://localhost:8080"
// };

app.use(express.static(__dirname + "/public"));
app.use(cors("*"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", require("./routes/index.routes"));

const run = async () => {
  // Start the server
  const port = process.env.SERVER_PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at Port ${port}`);
  });
};

run();
