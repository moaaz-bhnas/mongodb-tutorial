/* --- Get only name, genre, rating of the tv shows --- */
db.shows.find({}, { name: 1, genre: 1, rating: 1 }).pretty();
