// Examples

/* --- Equality --- */
db.shows.findOne({ name: "Lost" });

/* --- Comparison --- */
db.shows.find({ episodesNumber: { $lte: 50 } }).pretty();

/* --- Embedded field --- */
db.shows.find({ "rating.average": { $gte: 9 } }).pretty();

/* --- Embedded array --- */
db.shows.find({ genres: "Drama" }).pretty();
// Equality here means the items exists in the array

/* --- Embedded array (exact equality) --- */
db.shows.find({ genres: ["Drama"] }).pretty();
// Only shows with a single "Drama" genre

/* --- check specific values --- */
db.shows.find({ director: { $in: ["Martin", "Tarantino"] } }).pretty();

/* =====================================================================
  Logical operators
======================================================================== */

/* --- Match multiple conditions (array of conditions) --- */
db.shows
  .find({
    $or: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9 } }],
  })
  .pretty();
// Get terrible and best movies

/* --- Get all normal movies --- */
db.shows
  .find({
    $nor: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9 } }],
  })
  .pretty();
// Movies that are not extreme

/* --- Get highly-rated drama shows --- */
db.shows
  .find({
    $and: [{ genres: "Drama" }, { "rating.average": { $gt: 9 } }],
  })
  .pretty();

/* --- Get highly-rated drama shows (2) --- */
db.shows.find({ genres: "Drama", "rating.average": { $gt: 9 } }).pretty();

/* --- Find shows that r not comedy عايزين نعيط --- */
db.shows.find({ genres: { $ne: "Comedy" } }).pretty();
db.shows.find({ genres: { $not: { $eq: "Comedy" } } }).pretty(); // $not reverts a query

/* =====================================================================
  Element operators
======================================================================== */

/* --- Find all users who r not sellers --- */
db.users.find({ seller: { $exists: false } }).count();

/* --- Find all users who have tickets, and the tickets r > 3 --- */
db.users.find({ tickets: { $exists: true, $gt: 3 } });

/* --- Find all users who have tickets, and it's a number --- */
db.users.find({ tickets: { $exists: true, $type: "number" } });

/* --- Find all products who have sale property and it's assigned a value --- */
db.users.find({ sale: { $exists: true, $ne: null } });

/* --- Find all products with the sale property of a number or a string type --- */
db.users.find({ sale: { $type: ["number", "string"] } });

/* =====================================================================
  Evaluation operators
======================================================================== */

/* --- Find all products whose names contain the word "stretch" --- */
db.shows.find({ name: { $regex: /stretch/ } });

/* --- Find all products where stock > target --- */
db.products.find({ $expr: { $gt: ["$stock", "$target"] } });

/* --- Find all products where stock > target by at least 20 if stock is >= 200 or by 5 otherwise --- */
db.products
  .find({
    $expr: {
      $gt: [
        {
          $cond: {
            if: { $gte: ["$stock", 200] },
            then: { $subtract: ["$stock", 20] },
            else: { $subtract: ["$stock", 10] },
          },
        },
        "$target",
      ],
    },
  })
  .pretty();
// $expr is used to compare two fields in a document, and find all documents where this comparison returns a specific result.

/* =====================================================================
  Array operators
======================================================================== */

// users db
const users = [
  {
    favAnimes: [
      {
        name: "Attack on titans",
        episodes: 67,
        watchedEpisodes: 67,
      },
      {
        name: "Hunter x Hunter",
        episodes: 148,
        watchedEpisodes: 148,
      },
      {
        name: "Death Note",
        episodes: 67,
        watchedEpisodes: 50,
      },
    ],
    favGenres: ["Drama", "Slice of Life"],
  },
];

/* --- Find all users whose favorite anime is "Hunter x Hunter" --- */
db.users.find({ "favAnimes.name": "Hunter x Hunter" });

/* --- Find all users with exactly 3 favorite animes --- */
db.users.find({ favAnimes: { $size: 3 } });

/* --- Find all users whose favorite genres are exactly "Drama" and "Slice of Life" (regardless) of the order --- */
db.users.find({ favGenres: { $all: ["Slice of Life", "Drama"] } });

/* --- Find all "Death Note" fans who watched more than 60 epsiodes --- */
// Wrong solution: because that would match users who watched > 60 episodes of different animes too
db.users.find({
  "favAnimes.name": "Death Note",
  "favAnimes.watchedEpisodes": { $gt: 60 },
});
// Right solution
db.users.find({
  favAnimes: {
    $elemMatch: { name: "Death Note", watchedEpisodes: { $gt: 60 } },
  },
});
