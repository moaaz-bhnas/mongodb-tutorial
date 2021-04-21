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
  - End with first point to state the end of the polygon
*/
