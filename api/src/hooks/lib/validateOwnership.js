import errors from 'feathers-errors';

const defaultOptions = {
  eventId: hook => hook.params.eventId
}

export function validateOwnership(options = {}) {
  const opts = {
    ...defaultOptions,
    ...options
  };

  return hook => {
    const { method, params } = hook;
    const eventId = opts.eventId(hook);
    const events = params.events;

    if (!params.provider) {
      return hook;
    }

    if (!events || events.length === 0 || !events.find(event => event.id == eventId && event.owner )) {
      throw new errors.Forbidden('Your do not have permission to do this');
    }

    return hook;
  }
}
