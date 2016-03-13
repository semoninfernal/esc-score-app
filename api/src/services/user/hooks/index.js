'use strict';

const globalHooks = require('../../../hooks');
const auth = require('feathers-authentication').hooks;
const removePassword = require('./removePassword');

exports.before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ],
  create: [
    auth.hashPassword()
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ]
};

exports.after = {
  all: [
    removePassword()
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
