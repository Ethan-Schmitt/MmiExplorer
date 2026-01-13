/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3219405885")

  // update collection data
  unmarshal({
    "name": "Competence"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3219405885")

  // update collection data
  unmarshal({
    "name": "UE"
  }, collection)

  return app.save(collection)
})
