/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2885626883")

  // update collection data
  unmarshal({
    "name": "S2"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2885626883")

  // update collection data
  unmarshal({
    "name": "s2"
  }, collection)

  return app.save(collection)
})
