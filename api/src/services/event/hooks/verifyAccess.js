import errors from 'feathers-errors';

// This can be made a general validation function by specifying:
// serviceName
// validation
export default function() {
  return hook => {
    const { id, method, params } = hook;

    return new Promise((resolve, reject) => {
      hook.app.service('/events').get(id, params).then(event => {
        const notOwner = event && !event.owner;

        if (method === 'remove' && notOwner) {
          reject(new errors.Forbidden('You can not delete someone elses event'));
        } else if (method === 'patch' && notOwner) {
          reject(new errors.Forbidden('You can not edit someone elses event'));
        } else {
          resolve(hook);
        }
      }).catch(reject);
    });
  }
}
