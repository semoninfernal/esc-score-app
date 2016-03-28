import service from 'feathers-knex';
import ItemService from './item-service';
import { before, after } from './hooks';
import { items } from '../names';

export default function() {
  const app = this;

  const options = {
    Model: app.get('knex'),
    name: 'event_items',
    paginate: {
      default: false,
    }
  };

  app.use(items, new ItemService(options));

  const itemService = app.service(items);

  itemService.before(before);
  itemService.after(after);
};
