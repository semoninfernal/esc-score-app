import errors from 'feathers-errors';
import * as names from '../../names';
import clone from 'lodash/clone';

const defaultOptions = {
  id: hook => hook.id,
  eventId: hook => hook.params.eventId,
  service: names.members
}

export default function(options = {}) {
  options = {
    ...defaultOptions,
    ...options
  };
  return hook => {
    const { params } = hook;

    if (!params.provider) {
      return hook;
    }

    // NOTE This feels a bit odd since it expects a certain behaviour from the service
    return new Promise((resolve, reject) => {
      hook.app.service(names.events).get(params.eventId, params)
        .then(() => {
          resolve(hook)
        })
        .catch(reject);
    });
  }
}
