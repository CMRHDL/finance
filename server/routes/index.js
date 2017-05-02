const express = require('express')
const passport = require('passport')
const Attribution = require('../models/attribution')
const Settings = require('../models/settings')
const Account = require('../models/account')
const Recordset = require('../models/recordset')
const _ = require('lodash')
const router = express.Router()

const {
  find,
  save,
  deleteEntity,
  asJson,
  asPlain,
  populate,
} = require('../mongoose')

const mongoose = require('mongoose')

const auth = passport.authenticate('local')

router.post('/api/session', auth, (req, res, next) => {
  updateSession({ req, res, next })
})

router.delete('/api/session', (req, res, next) => {
  req.logout()
  updateSession({ req, res, next })
})

router.post('/api/account', (req, res, next) => {
  const { username, password } = req.body
  Account.register(new Account({ username }), password, err => {
    if (err) {
      return next(err)
    }

    passport.authenticate('local')(req, res, () => {
      updateSession({ req, res, next })
    })
  })
})

router.get('/api/recordset', (req, res, next) => {
  // exec(Recordset.find({}).populate('attribution')).subscribe(asJson(res), console.log)

  Recordset
  .find({})
  .populate('attribution')
  .exec(function (err, story) {
    res.json(story)
  });
})

const simpleEndpoints = [
  { entity: Settings, url: '/api/settings' },
  { entity: Attribution, url: '/api/attribution' },
  { entity: Recordset, url: '/api/recordset' },
]

simpleEndpoints.forEach(({ entity, url }) => {
  router.get(url, (req, res, next) => {
    find(entity).subscribe(asJson(res), console.log)
  })

  router.post(url, (req, res, next) => {
    save(new entity(req.body)).subscribe(
      model => res.json(model[0]._doc),
      console.log
    )
  })

  router.delete(url, (req, res, next) => {
    deleteEntity(entity.find({})).subscribe(
      asPlain(res, 'deleted'),
      console.log
    )
  })

  router.put(url, (req, res, next) => {
    const conditions = { '_id': req.body._id };
    const update = { $set: req.body }
    const options = { multi: false };
    entity.update(conditions, update, options, function (err) {
      if (err) {
        res.send(err);
      }
      res.json('something for ' + req.body.key + ' was updated');
    });
  })
});

function updateSession({ req, res, next }) {
  req.session.save(err => {
    if (err) {
      return next(err)
    }
    res.send(true)
  })
}

module.exports = router
