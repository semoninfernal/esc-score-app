import { isFunction, isArray } from 'lodash';

function removeAttributes(result, attrs) {
  for (const prop of attrs) {
    delete result[prop];
  }
}

export function cleanResult(...attrs) {
  return function(hook) {
    // Do not touch internal hooks
    if (hook.params.internal) {
      return hook;
    }

    // Bookshelf returns models from services so we need to serialize it here instead
    if (isFunction(hook.result.toJSON)) {
      hook.result = hook.result.toJSON();
    }

    // We need to mutate the hook to avoid circular references
    if (isArray(hook.result)) {
      for (const item of hook.result) {
        removeAttributes(item, attrs);
      }
    } else {
      removeAttributes(hook.result, attrs);
    }

    return hook;
  }
}

export function populateEvent() {
  return hook => {
    if (!hook.params.provider) {
      return hook;
    }

    hook.params.query.eventId = hook.params.eventId;

    return hook;
  }
}

export function populateMemberships() {
  return hook => {
    if (!hook.params.provider) {
      return hook;
    }



  }
}
