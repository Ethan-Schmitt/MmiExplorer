/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3179527867")

  // update collection data
  unmarshal({
    "name": "Semestre"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3179527867")

  // update collection data
  unmarshal({
    "name": "Comprendre"
  }, collection)

  return app.save(collection)
})
