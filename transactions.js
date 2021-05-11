const session = db.getMongo().startSession(); // Simply an object that allows grouping a set of requests
session.startTransaction(); // Now the server treats following commands as part of this session

const usersCollection = session.getDatabase("products").users;
const productsCollection = session.getDatabase("products").products;

// commands to be grouped together (not implemented, but rather saves as todo)
usersCollection.deleteOne({ _id: "" });
productsCollection.deleteMany({ _id: "" });

// لو مش عايز تكمل
session.abortTransaction();

// ابعت
session.commitTransaction();

/* Note: it can be used on an operation level
  - You can wrap `.insertMany()` / `.deleteMamy()` in a session to make sure that it either deletes all or none 
*/
