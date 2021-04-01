db.runCommand({
  // To add a schema after creating the collection
  collMod: "products",
  validator: {
    $jsonSchema: {
      bsonType: "object", // Each doc added to the collection must be a valid object
      required: [
        "name",
        "category",
        "clothing",
        "group",
        "details",
        "colors",
        "price",
      ],
      properties: {
        // How should each property added to the doc be like
        name: {
          bsonType: "string",
          description: "Must be a string and is required",
        },
        details: {
          bsonType: "array",
          description: "Must be an array and is required",
          items: {
            bsonType: "object",
            required: ["name_en", "name_ar", "value_en", "value_ar"],
            properties: {
              name_en: {
                bsonType: "string",
              },
            },
          },
        },
      },
    },
  },
  validationAction: "warn", // Default is error
});
