import authentication from 'feathers-authentication';
import { populateEvents, validateMembership, validateOwnership } from '../../../hooks';

const auth = authentication.hooks;

export const before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
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
    auth.requireAuth(),
    populateEvents(),
    validateOwnership()
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    populateEvents(),
    validateOwnership()
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    populateEvents(),
    validateOwnership()
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    populateEvents(),
    validateOwnership()
  ]
};

export const after = {
  all: []
};
