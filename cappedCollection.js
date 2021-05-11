db.createCollection("capped", { capped: true, size: 1000, max: 10 });
/*
  - (capped: true) a collection that has a maximum amount of data/collections and deletes old data when the size/max exceeds the specified amount
  - (size) in bytes - required
  - (max) in documents - optional
*/

db.capped.find().sort({ $natural: -1 }).pretty();
/*
  - In a normal collection, docs r retrieved by insertion order
  - But that's not gauranteed, where it's in capped collection
  - And to reverse that order, use $natural operator
*/
