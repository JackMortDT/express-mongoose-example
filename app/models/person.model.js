module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      email: String,
      age: Number
    }
  );

  const Person = mongoose.model("person", schema);
  return Person;
}