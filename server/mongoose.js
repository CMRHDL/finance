const Rx = require('rx')
const _ = require('lodash')

const save = Entity => Rx.Observable.fromNodeCallback(Entity.save, Entity)()
const find = Entity => Rx.Observable.fromNodeCallback(Entity.find, Entity)()
const exec = Entity => Rx.Observable.fromNodeCallback(Entity.populate, Entity)()
const deleteEntity = Entity =>
  Rx.Observable.fromNodeCallback(Entity.remove, Entity)()
const asJson = _.curry((res, message) => res.json(message))
const asPlain = (res, message) => () => {
  res.send(message)
}

module.exports = { find, save, asJson, asPlain, deleteEntity, exec }
