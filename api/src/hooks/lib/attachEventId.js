export function attachEventId() {
  return hook => {
    if (hook.type !== 'before') {
      return hook;
    }

    hook.data = {
      ...hook.data,
      event_id: hook.params.eventId
    };

    return hook;
  }
}
