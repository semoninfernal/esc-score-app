import errors from 'feathers-errors';
import * as names from '../../services/names';

export function populateEvents() {
  return hook => {

    if (!hook.params.provider) {
      return hook;
    }

    return new Promise((resolve, reject) => {
      hook.app.service(names.events)._find(hook.params)
        .then(events => {
          hook.params.events = events;

          resolve(hook);
        }).catch(reject);
    });
  }
}
