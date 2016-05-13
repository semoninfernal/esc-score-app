import errors from 'feathers-errors';
import * as names from '../../services/names';

export function validateMembership() {
  return hook => {
    const { params } = hook;
    const eventId = params.eventId;
    const events = params.events;

    if (!params.provider) {
      return hook;
    }

    // If no events are present on the hook, assume the user is not a member
    if (!events || events.length === 0 || !events.find(event => event.id == eventId)) {
      throw new errors.NotFound(`No event with id ${params.eventId} found`);
    }

    // Populate member in params
    return new Promise((resolve, reject) => {
      hook.app.service(names.members)._find(hook.params)
        .then(members => {
          hook.params.member = members.find(member => member.user_id === params.user.id);

          resolve(hook);
        }).catch(reject);
    });
  }
}
