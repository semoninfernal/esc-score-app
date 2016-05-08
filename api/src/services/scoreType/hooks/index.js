import authentication from 'feathers-authentication';
import {
  populateEvents,
  validateMembership,
  validateOwnership,
  toCamelCase,
  toSnakeCase } from '../../../hooks';

const auth = authentication.hooks;

export const before = {
  all: [
    toSnakeCase(),
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    populateEvents(),
    validateMembership()
  ]
};

export const after = {
  all: [
    toCamelCase()
  ]
};
