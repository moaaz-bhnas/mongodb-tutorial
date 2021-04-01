db.users.insertOne({ _id: "sa3eed", name: "Sa3eed", age: 26 });

db.users.insertMany(
  [
    { _id: "sa3eed", name: "Sa3eed", age: 26 }, // error
    { _id: "sakr", name: "Sakr", age: 22 }, // will be inserted due to { ordered: false }
  ],
  { ordered: false }
);
