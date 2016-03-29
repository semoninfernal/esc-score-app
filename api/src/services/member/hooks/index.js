import authentication from 'feathers-authentication';
import { populateEvents, validateMembership, validateOwnership } from '../../../hooks';
import ensureNotRemoveSelf from './ensureNotRemoveSelf';

const auth = authentication.hooks;

export const before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    populateEvents(),
    validateMembership()
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    populateEvents(),
    validateMembership()
  ],
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    populateEvents(),
    validateMembership(),
    validateOwnership()
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    populateEvents(),
    validateMembership(),
    validateOwnership()
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    populateEvents(),
    validateMembership(),
    validateOwnership()
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    populateEvents(),
    validateMembership(),
    validateOwnership(),
    ensureNotRemoveSelf()
  ]
};

export const after = {
  all: []
};
