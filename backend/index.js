// use and initialize express app
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// require routes
require("./routes")(app);

// listen to port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
