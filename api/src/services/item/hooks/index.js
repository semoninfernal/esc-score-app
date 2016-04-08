import authentication from 'feathers-authentication';
import {
  attachEventId,
  populateEvents,
  validateMembership,
  validateOwnership,
  validatePayload } from '../../../hooks';

const auth = authentication.hooks;

export const before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    populateEvents(),
    validateMembership(),
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    populateEvents(),
    validateMembership()
  ],
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    populateEvents(),
    validateOwnership(),
    attachEventId()
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    populateEvents(),
    validateOwnership()
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    populateEvents(),
    validateOwnership(),
    validatePayload('name', 'description', 'image', 'sort_index')
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    populateEvents(),
    validateOwnership()
  ]
};

export const after = {
  all: []
};
