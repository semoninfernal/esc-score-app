export function remove(... fields) {
  const removeFields = data => {
    for(let field of fields) {
      data[field] = undefined;
      delete data[field];
    }
  };

  const callback = typeof fields[fields.length - 1] === 'function' ?
    fields.pop() : (hook) => !!hook.params.provider;

  return function(hook) {
    if (!hook.params.provider) {
      return hook;
    }

    const result = hook.type === 'before' ? hook.data : hook.result;
    const next = condition => {
      if (result && condition) {
        if (Array.isArray(result)) {
          result.forEach(removeFields);
        } else {
          removeFields(result);

          if (result.data) {
            if (Array.isArray(result.data)) {
              result.data.forEach(removeFields);
            } else {
              removeFields(result.data);
            }
          }
        }
      }
      return hook;
    };

    const check = callback(hook);

    return check && typeof check.then === 'function' ?
      check.then(next) : next(check);
  };
}
