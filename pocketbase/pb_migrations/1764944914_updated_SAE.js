/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_545907884")

  // update collection data
  unmarshal({
    "name": "AC"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_545907884")

  // update collection data
  unmarshal({
    "name": "SAE"
  }, collection)

  return app.save(collection)
})
