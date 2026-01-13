/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3686917767")

  // remove field
  collection.fields.removeById("editor1843675174")

  // remove field
  collection.fields.removeById("relation1902677948")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3686917767")

  // add field
  collection.fields.addAt(3, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "editor1843675174",
    "maxSize": 0,
    "name": "description",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3179527867",
    "hidden": false,
    "id": "relation1902677948",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "semestre",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
