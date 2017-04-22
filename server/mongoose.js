const Rx = require('rx')

const save = Entity => Rx.Observable.fromNodeCallback(Entity.save, Entity)()
const find = Entity => Rx.Observable.fromNodeCallback(Entity.find, Entity)()

module.exports = { find, save }
