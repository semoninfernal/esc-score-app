import errors from 'feathers-errors';

export default function ensureNotRemoveSelf() {
  return hook => {
    if (hook.params.user.id == hook.id) {
      throw new errors.BadRequest('You can not remove yourself');
    }
    return hook;
  }
}
