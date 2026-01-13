/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_735139002")

  // update collection data
  unmarshal({
    "name": "S1"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_735139002")

  // update collection data
  unmarshal({
    "name": "competences"
  }, collection)

  return app.save(collection)
})
