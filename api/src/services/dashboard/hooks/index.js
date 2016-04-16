import authentication from 'feathers-authentication';
import {
  attachEventId,
  populateEvents,
  validateMembership,
  toCamelCase } from '../../../hooks';

const auth = authentication.hooks;

export const before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    populateEvents(),
    validateMembership()
  ]
};

export const after = {
  all: [],
  find: [
    toCamelCase()
  ]
};
