import errors from 'feathers-errors';

export default function ensureNotRemoveSelf() {
  return hook => {
    if (!hook.params.provider) {
      return hook;
    }

    if (hook.params.member.id == hook.id) {
      throw new errors.BadRequest('You can not remove yourself');
    }
    return hook;
  }
}
