import errors from 'feathers-errors';

// This can be made a general validation function by specifying:
// serviceName
// validation
const defaultOptions = {
  eventId: hook => hook.id
}

export default function(options = {}) {
  options = {
    ...defaultOptions,
    ...options
  };

  return hook => {
    const { id, method, params } = hook;

    return new Promise((resolve, reject) => {
      hook.app.service('/events').get(options.eventId(hook), params).then(event => {
        const notOwner = event && !event.owner;

        if (method === 'remove' && notOwner) {
          reject(new errors.Forbidden('You can not delete what does not belong to you!'));
        } else if (method === 'patch' && notOwner) {
          reject(new errors.Forbidden('You can not edit what does not belong to you'));
        } else if (method === 'create' && notOwner) {
          reject(new errors.Forbidden('You can not create in what does not belong to you'));
        } else {
          resolve(hook);
        }
      }).catch(reject);
    });
  }
}
