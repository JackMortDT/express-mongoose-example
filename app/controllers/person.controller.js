const log = require("../config/logging.js");
const db = require("../models");
const Person = db.person;

exports.findOne = (req, res) => {
  const id = req.params.id;
  log.debug(`Find person by id ${id}`);

  Person.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Person with id: " + id});
      else res.send(data);
    })
    .catch(_ => {
      res.status(500).send({ 
        message: "Error retrieving Person with id " + id 
      });
    });
};

exports.findAll = (req, res) => {
  log.debug("Find all people!")
  Person.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          ee.message || "Some error ocurred while retrieving people"
      })
    })
};

exports.create = (req, res) => {
  log.debug(`Create people ${req.body}`)
  if(!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    })
    return;
  }

  const person = new Person({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
  });

  person
    .save(person)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while creating the person"
      });
    });
};

exports.update = (req, res) => {
  log.debug(`Update people ${req.body} with id: ${req.params.id}`)
  if(!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Person.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if(!data) {
        res.status(404).send({
          message: `Cannot update the person with id=${id}. Maybe Person not found`
        });
      } else res.send({ message: "Person was updated successfully. "})
    })
    .catch(_ => {
      res.status(500).send({
        message: "Error updating Person with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  log.debug(`Delete person ${id}`)

  Person.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if(!data) {
        res.status(404).send({
          message: `Cannot delete Person with id=${id}. Maybe Person was not found!`
        });
      } else {
        res.send({
          message: "Person was deleted successfully"
        });
      }
    })
    .catch(_ => {
      res.status(500).send({
        message: "Could not delete Person with id=" + id
      });
    });
}