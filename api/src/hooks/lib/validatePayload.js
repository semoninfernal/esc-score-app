import errors from 'feathers-errors';

export function validatePayload(...whitelist) {
  return hook => {
    const { data } = hook;

    if (!hook.params.provider || hook.type !== 'before') {
      return hook;
    }

    const invalidProps = Object.keys(data).reduce((acc, key) => {
      return !whitelist.includes(key) ? [...acc, key] : acc;
    }, []);

    if (invalidProps.length > 0) {
      throw new errors.BadRequest(`Keys ${invalidProps} are not allowed`);
    }

    return hook;
  }
}
