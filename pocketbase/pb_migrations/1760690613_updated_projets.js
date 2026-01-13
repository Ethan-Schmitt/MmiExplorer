/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_621264433")

  // remove field
  collection.fields.removeById("text3503948798")

  // remove field
  collection.fields.removeById("file2368744649")

  // remove field
  collection.fields.removeById("number3734160847")

  // remove field
  collection.fields.removeById("relation783762391")

  // remove field
  collection.fields.removeById("url4217653407")

  // remove field
  collection.fields.removeById("autodate2990389176")

  // remove field
  collection.fields.removeById("autodate3332085495")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_621264433")

  // add field
  collection.fields.addAt(1, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "text3503948798",
    "maxSize": 0,
    "name": "nom_projet",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "file2368744649",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "img_projet",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number3734160847",
    "max": null,
    "min": null,
    "name": "annee",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3219405885",
    "hidden": false,
    "id": "relation783762391",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "modules",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "url4217653407",
    "name": "lien_projet",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "autodate2990389176",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "autodate3332085495",
    "name": "updated",
    "onCreate": true,
    "onUpdate": true,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  return app.save(collection)
})
