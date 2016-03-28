import authentication from 'feathers-authentication';
import validateOwner from '../../event/hooks/validateOwner';
import validateMember from '../../event/hooks/validateMember';

const validateOwnerOptions = {
  eventId: hook => hook.params.eventId
};

const auth = authentication.hooks;

export const before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    validateMember()
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    validateMember()
  ],
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    validateMember(),
    validateOwner(validateOwnerOptions)
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    validateMember(),
    validateOwner(validateOwnerOptions)
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    validateMember(),
    validateOwner(validateOwnerOptions)
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    validateMember(),
    validateOwner(validateOwnerOptions)
  ]
};

export const after = {
  all: []
};
