/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3686917767")

  // add field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3686917767",
    "hidden": false,
    "id": "relation1781323207",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "ressources",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3686917767")

  // remove field
  collection.fields.removeById("relation1781323207")

  return app.save(collection)
})
