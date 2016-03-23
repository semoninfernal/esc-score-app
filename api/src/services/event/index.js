import service from 'feathers-knex';
import EventService from './event-service';
import { before, after } from './hooks';
import { events } from '../names';

export default function() {
  const app = this;

  const options = {
    Model: app.get('knex'),
    name: 'events',
    paginate: {
      default: false,
      max: 25
    }
  };

  app.use(events, new EventService(options));

  const eventService = app.service(events);

  eventService.before(before);
  eventService.after(after);
};
