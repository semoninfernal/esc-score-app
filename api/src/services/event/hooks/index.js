import authentication from 'feathers-authentication';
import verifyAccess from './verifyAccess';

const auth = authentication.hooks;

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
    auth.requireAuth(),
    verifyAccess()
  ]
};

export const after = {
  all: []
};
