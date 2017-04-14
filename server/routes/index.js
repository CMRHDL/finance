const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const _ = require('lodash');
const router = express.Router();

const { find, save } = require('../mongoose');

const mongoose = require('mongoose');

const auth = passport.authenticate('local');

router.post('/api/session', auth, (req, res, next) => {
  updateSession({ req, res, next });
});

router.delete('/api/session', (req, res, next) => {
  req.logout();
  updateSession({ req, res, next });
});

router.post('/api/account', (req, res, next) => {
  const { username, password } = req.body;
  Account.register(new Account({ username }), password, (err) => {
    if (err) {
      return next(err);
    }

    passport.authenticate('local')(req, res, () => {
      updateSession({ req, res, next });
    });

  });
});

function updateSession({ req, res, next }) {
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    res.send(true);
  });
}

module.exports = router;
