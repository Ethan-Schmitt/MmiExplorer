/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3686917767")

  // update collection data
  unmarshal({
    "name": "Enseignement"
  }, collection)

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number3186012464",
    "max": null,
    "min": null,
    "name": "nb_heures_semaine",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number1520195326",
    "max": null,
    "min": null,
    "name": "nb_heures_PPN",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3686917767")

  // update collection data
  unmarshal({
    "name": "Ressources"
  }, collection)

  // remove field
  collection.fields.removeById("number3186012464")

  // update field
  collection.fields.addAt(4, new Field({
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

  return app.save(collection)
})
