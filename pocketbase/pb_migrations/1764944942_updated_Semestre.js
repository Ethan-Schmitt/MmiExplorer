/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3179527867")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number1272968043",
    "max": null,
    "min": null,
    "name": "niveau",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3179527867")

  // remove field
  collection.fields.removeById("number1272968043")

  return app.save(collection)
})
