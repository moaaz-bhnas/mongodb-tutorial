const cursor = db.shows.find();

/* --- Get next document --- */
cursor.next();

/* --- Check if the cursor has a next document --- */
cursor.hasNext();

/* --- Iterate through all documents (efficient) --- */
cursor.forEach((show) => print(show.name));

/* --- Get all docs as an array (inefficient) --- */
cursor.toArray();
