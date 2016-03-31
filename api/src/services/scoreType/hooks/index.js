import authentication from 'feathers-authentication';
import { populateEvents, validateMembership, validateOwnership } from '../../../hooks';

const auth = authentication.hooks;

export const before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    populateEvents(),
    validateMembership(),
    validateOwnership()
  ]
};

export const after = {
  all: []
};
