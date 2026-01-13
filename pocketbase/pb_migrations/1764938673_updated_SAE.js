/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_545907884")

  // remove field
  collection.fields.removeById("text4286007220")

  // remove field
  collection.fields.removeById("editor3807930449")

  // remove field
  collection.fields.removeById("editor277175022")

  // remove field
  collection.fields.removeById("editor1843675174")

  // remove field
  collection.fields.removeById("editor1014501382")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_545907884")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text4286007220",
    "max": 0,
    "min": 0,
    "name": "titre",
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
    "id": "editor3807930449",
    "maxSize": 0,
    "name": "objectif",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "editor277175022",
    "maxSize": 0,
    "name": "problematique",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(4, new Field({
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
  collection.fields.addAt(5, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "editor1014501382",
    "maxSize": 0,
    "name": "devoirs",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  return app.save(collection)
})
