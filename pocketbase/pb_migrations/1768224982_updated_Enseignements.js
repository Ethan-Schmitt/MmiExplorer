/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3686917767")

  // update field
  collection.fields.addAt(9, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3179527867",
    "hidden": false,
    "id": "relation2283728362",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "semestre",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3686917767")

  // update field
  collection.fields.addAt(9, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3179527867",
    "hidden": false,
    "id": "relation2283728362",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "Semestre",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
