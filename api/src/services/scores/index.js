import service from 'feathers-knex';
import ScoreService from './score-service';
import { before, after } from './hooks';
import { scores } from './../names';

export default function() {
  const app = this;

  const options = {
    Model: app.get('knex'),
    name: 'event_scores',
    paginate: {
      default: false
    }
  };

  app.use(scores, new ScoreService(options));

  const scoreService = app.service(scores);

  scoreService.before(before);
  scoreService.after(after);
};
