import errors from 'feathers-errors';
import * as names from '../../names';

export default function populateItem() {
  return hook => {

    if (!hook.params.provider || hook.type !== 'before') {
      return hook;
    }

    return new Promise((resolve, reject) => {
      hook.app.service(names.items)._get(hook.params.itemId, hook.params)
        .then(item => {
          hook.params.item = item;

          resolve(hook);
        }).catch(reject);
    });
  }
}
