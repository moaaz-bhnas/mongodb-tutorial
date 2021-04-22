// a) Adding one location
db.places.insertOne({
  name: "Anas Bin Malik",
  location: { type: "Point", coordinates: [29.2893026, 47.9690314] },
  /* GeoJSON object
    - Must include "type" and "coordinates" array that starts with longitude
    - "location" name is optional. Could be "ging" instead
  */
});

// b) Query: Find places near Anas Bin Malek
db.places.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [29.2893026, 47.9690314] },
      $maxDistance: 500,
      $minDistance: 10,
    },
  },
});
/* 
  - $near: a special operator for geospatial data
  - Geometry meaning: the branch of mathematics concerned with the properties and relations of points, lines, surfaces, solids, and higher dimensional analogues.
  - $geometry: the branch of mathematics concerned with the properties and relations of points, lines, surfaces, solids, and higher dimensional analogues.
  - $near query requires a geospatial index
  - Distances: this query returns documents that are at least 10 meters from and at most 500 meters from the specified GeoJSON point, sorted from nearest to farthest:
*/

// c) Adding geospatial index to track the distance
db.places.createIndex({ location: "2dsphere" });

// d) Finding places inside a certain area
const p1 = [47.96766, 29.28999];
const p2 = [47.96841, 29.28153];
const p3 = [47.97929, 29.2813];
const p4 = [47.98086, 29.29244];

db.places.find({
  location: {
    $geoWithin: {
      $geometry: { type: "Polygon", coordinates: [[p1, p2, p3, p4, p1]] },
    },
  },
});
/* 
  - An area is represented by a polygon on the map
  - Coordinates for an area is [[[], [], []]] 
  - End with first point to state the end of the polygon
*/

// e) Finding out if a user is in a specific area
// 1st create the area
db.areas.insertOne({
  name: "neighborhood",
  location: { type: "Polygon", coordinates: [[p1, p2, p3, p4, p1]] },
});
// 2nd the index
db.areas.createIndex({ area: "2dsphere" });
// 3rd Find area that "intersects" with the user's location
db.areas.find({
  area: {
    $geoIntersects: {
      $geometry: { type: "Point", coordinates: [47.97751, 29.28312] },
    },
  },
});
/* 
  - $geoIntersects: Area that intersects with a point. Not $geoWithin as areas can't be within points
  - You can find areas that intersects with a certain area too
*/

// f) Finding places within a certain radius
db.places.find({
  location: {
    $geoWithin: { $centerSphere: [[47.9668434, 29.2892809], 2 / 6378.1] },
  },
});
/* 
  - Docs are not sorted unlike $near
  - $centerSphere: takes 2 arguments:
    * center point array
    * radius: https://docs.mongodb.com/manual/tutorial/calculate-distances-using-spherical-geometry-with-2d-geospatial-indexes/
*/
