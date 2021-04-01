// { w: 0 } means we dont wait for the database to acknowledge the data and give it an id
// A rare use case for when u insert tons of data and u dont care if some get lost
db.users.insertOne({ name: "Tarek" }, { writeConcern: { w: 0 } });

// { w: 0 } is the default
// Waits till database acknowlegde and give id
db.users.insertOne({ name: "3amer" }, { writeConcern: { w: 1 } });

// { j: false } is the default
// Leaves journal writing for storage engine
db.users.insertOne({ name: "Animia" }, { writeConcern: { w: 1, j: false } });

// { j: true } waits till data is written to the journal file
db.users.insertOne({ name: "Animia" }, { writeConcern: { w: 1, j: true } });
