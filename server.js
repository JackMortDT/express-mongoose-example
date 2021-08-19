const express = require("express");
const cors = require("cors");
const log = require("./app/config/logging.js");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    log.info({
      message: "Connected to the database D:"
    });
  })
  .catch(err => {
    log.error("Cannot connect to the database!", err);
    process.exit();
  });

require("./app/routes/person.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  log.info(`Server is running on port ${PORT}`)
})