import authentication from 'feathers-authentication';
import { populateEvents, validateOwnership } from '../../../hooks';

const auth = authentication.hooks;

const ownerOptions = {
  eventId: hook => hook.id
};

export const before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
  ],
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    populateEvents(),
    validateOwnership(ownerOptions)
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    populateEvents(),
    validateOwnership(ownerOptions)
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    populateEvents(),
    validateOwnership(ownerOptions)
  ]
};

export const after = {
  all: []
};
