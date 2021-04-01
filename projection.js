/* --- Get only name, genre, rating of the tv shows --- */
db.shows.find({}, { name: 1, genre: 1, rating: 1 }).pretty();

/* --- Project on medium embedded property of cover image document --- */
db.shows.find({}, { name: 1, genre: 1, rating: 1, "cover.medium": 1 }).pretty();

/* ============================================================== 
  Projecting on Arrays 
============================================================== */

// Both the $ operator and the $elemMatch operator project the first matching element from an array based on a condition.

/* --- Include only the genre queried  --- */
db.shows.find({ genres: "Comedy" }, { "genres.$": 1 });
// .$ means find the 1st element that matches the condition

/* --- Include only the "Horror" genre in the documents that has a "Drama" genre  --- */
db.shows.find(
  { genres: "Comedy" }, // Which elements r important for your filtering
  { genres: { $elemMatch: { $eq: "Horror" } } } // Which elements r important for displaying
);
// The $elemMatch projection operator takes an explicit condition argument. This allows you to project based on a condition not in the query, or if you need to project based on multiple fields in the array's embedded documents. See Array Field Limitations for an example.

/* --- Find all shows that has a rating above 8 and only display the 1st genres if it's comedy / drama  --- */
db.shows.find(
  { "rating.average": { $gte: 8 } }, // Which elements r important for your filtering
  { genres: { $elemMatch: { $in: ["Drama", "Comedy"] } } } // Which elements r important for displaying
);

/* --- Project the first 2 elements in the genres array --- */
db.shows.find(
  { "rating.average": { $gte: 9 } },
  { name: 1, genres: { $slice: 2 } }
);

/* --- Project 2 elements in the genres array and skip 1 --- */
db.shows.find(
  { "rating.average": { $gte: 9 } },
  { name: 1, genres: { $slice: [1, 2] } }
);
