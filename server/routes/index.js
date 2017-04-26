const express = require('express')
const passport = require('passport')
const Attribution = require('../models/attribution')
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

// RECORDSET
router.post('/api/recordset', (req, res, next) => {
  save(new Recordset(req.body)).subscribe(
    asPlain(res, 'created Recordset(s)'),
    console.log
  )
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

router.delete('/api/recordset', (req, res, next) => {
  deleteEntity(Recordset.find({})).subscribe(
    asPlain(res, 'deleted Recordset(s)'),
    console.log
  )
})

// ATTRIBUTION
router.post('/api/attribution', (req, res, next) => {
  save(new Attribution(req.body)).subscribe(
    model => res.json(model[0]._doc),
    console.log
  )
})

router.get('/api/attribution', (req, res, next) => {
  find(Attribution).subscribe(asJson(res), console.log)
})

router.delete('/api/attribution', (req, res, next) => {
  deleteEntity(Attribution.find({})).subscribe(
    asPlain(res, 'deleted Attribution(s)'),
    console.log
  )
})

function updateSession({ req, res, next }) {
  req.session.save(err => {
    if (err) {
      return next(err)
    }
    res.send(true)
  })
}

module.exports = router
