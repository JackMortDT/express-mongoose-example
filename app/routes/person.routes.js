module.exports = app => {
  const person = require("../controllers/person.controller.js");

  var router = require("express").Router();

  router.put("/", person.update);
  router.post("/", person.create);
  router.get("/", person.findAll);
  router.delete("/", person.delete);
  router.get("/:id", person.findOne);

  app.use("/person", router);
}