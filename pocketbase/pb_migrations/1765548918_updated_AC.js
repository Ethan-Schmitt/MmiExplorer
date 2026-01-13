/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_545907884")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3219405885",
    "hidden": false,
    "id": "relation3676338126",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "competences",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_545907884")

  // remove field
  collection.fields.removeById("relation3676338126")

  return app.save(collection)
})
