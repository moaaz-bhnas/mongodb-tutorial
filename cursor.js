const cursor = db.shows.find();

/* --- Get next document --- */
cursor.next();

/* --- Check if the cursor has a next document --- */
cursor.hasNext();

/* --- Iterate through all documents (efficient) --- */
cursor.forEach((show) => print(show.name));

/* --- Get all docs as an array (inefficient) --- */
cursor.toArray();

/* --- Sort shows by rating, and then by number of episodes --- */
cursor.sort({ rating: 1, episodesNumber: 1 });

/* --- Skip first 20 products for pagination (page 3) and limit results to 10 --- */
cursor.skip(20).limit(10);
