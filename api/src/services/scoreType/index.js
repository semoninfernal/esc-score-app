import service from 'feathers-knex';
import ScoreTypeService from './scoreType-service';
import { before, after } from './hooks';
import { scoreTypes } from './../names';

export default function() {
  const app = this;

  const options = {
    Model: app.get('knex'),
    name: 'event_score_types',
    paginate: {
      default: false
    }
  };

  app.use(scoreTypes, new ScoreTypeService(options));

  const scoreTypesService = app.service(scoreTypes);

  scoreTypesService.before(before);
  scoreTypesService.after(after);
};
