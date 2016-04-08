import errors from 'feathers-errors';
import * as names from '../../services/names';

export function populateOwnership() {
  return hook => {

    if (!hook.params.provider) {
      return hook;
    }

    return new Promise((resolve, reject) => {
      hook.app.service(names.scores)._get(hook.id, hook.params)
        .then(score => {
          if (score.event_member_id !== hook.params.member.id) {
            throw new errors.NotFound(`No score with id ${hook.id} found`);
          }

          resolve(hook);
        }).catch(reject);
    });
  }
}
