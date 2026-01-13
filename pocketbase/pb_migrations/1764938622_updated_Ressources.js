/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3686917767")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1579384326",
    "max": 0,
    "min": 0,
    "name": "name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
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
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number1520195326",
    "max": null,
    "min": null,
    "name": "nb_heures",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(4, new Field({
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

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3219405885",
    "hidden": false,
    "id": "relation776538779",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "ue",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "url2632842622",
    "name": "liens_notions",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_545907884",
    "hidden": false,
    "id": "relation2454062737",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "sae_liees",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3686917767")

  // remove field
  collection.fields.removeById("text1579384326")

  // remove field
  collection.fields.removeById("editor1843675174")

  // remove field
  collection.fields.removeById("number1520195326")

  // remove field
  collection.fields.removeById("relation1902677948")

  // remove field
  collection.fields.removeById("relation776538779")

  // remove field
  collection.fields.removeById("url2632842622")

  // remove field
  collection.fields.removeById("relation2454062737")

  return app.save(collection)
})
