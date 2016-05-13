import { camelCase, snakeCase } from 'lodash';

function convertDeep(obj, fn) {
  if (Array.isArray(obj)) {
    return obj.map(item => convertDeep(item, fn));
  }

  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, prop) => ({
      ...acc,
      [fn(prop)]: convertDeep(obj[prop], fn)
    }), {});
  }

  return obj;
}

export function toSnakeCase() {
  return hook => {
    if (hook.type !== 'before') {
      return hook;
    }

    hook.data = convertDeep(hook.data, snakeCase);

    return hook;
  }
}

export function toCamelCase() {
  return hook => {
    if (hook.type !== 'after') {
      return hook;
    }

    hook.result = convertDeep(hook.result, camelCase);

    return hook;
  }
}
