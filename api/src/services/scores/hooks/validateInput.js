import errors from 'feathers-errors';
import * as names from '../../names';

export default function validateInput() {
  return hook => {

    if (!hook.params.provider || hook.type !== 'before') {
      return hook;
    }

    function getScoreTypeId() {
      return new Promise(resolve => {
        if (hook.method === 'create') {
          resolve(hook.data.score_type_id);
        } else {
          hook.app.service(names.scores)._get(hook.id, hook.params)
            .then(score => {
              resolve(score.score_type_id)
            });
        }
      });
    }

    return new Promise((resolve, reject) => {
      getScoreTypeId()
        .then(id => {
          hook.app.service(names.scoreTypes)._get(id, hook.params)
            .then(scoreType => {
              const { value } = hook.data;
              if (!value) {
                throw new errors.BadRequest('You must provide a value');
              }

              if (scoreType.min > value || scoreType.max < value) {
                throw new errors.BadRequest(`Value must be min ${scoreType.min} and max ${scoreType.max}`);
              }

              resolve(hook);
            }).catch(reject);
        }).catch(reject);
    });
  }
}
