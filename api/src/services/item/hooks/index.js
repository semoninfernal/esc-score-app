import authentication from 'feathers-authentication';
import {
  attachEventId,
  populateEvents,
  validateMembership,
  validateOwnership,
  validatePayload,
  toCamelCase,
  toSnakeCase } from '../../../hooks';

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
    toSnakeCase(),
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    populateEvents(),
    validateOwnership(),
    validateMembership(), // We just need the member in params
    attachEventId()
  ],
  update: [
    toSnakeCase(),
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    populateEvents(),
    validateOwnership()
  ],
  patch: [
    toSnakeCase(),
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    populateEvents(),
    validateOwnership(),
    validateMembership(), // We just need the member in params
    validatePayload('name', 'description', 'image', 'sort_index')
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    populateEvents(),
    validateOwnership(),
    validateMembership(), // We just need the member in params
  ]
};

export const after = {
  all: [
    toCamelCase()
  ]
};
