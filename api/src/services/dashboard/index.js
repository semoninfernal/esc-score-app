import service from 'feathers-knex';
import DashboardService from './dashboard-service';
import { before, after } from './hooks';
import { dashboard } from '../names';

export default function() {
  const app = this;

  const options = {
    Model: app.get('knex'),
    name: 'events'
  };

  app.use(dashboard, new DashboardService(options));

  const dashboardService = app.service(dashboard);

  dashboardService.before(before);
  dashboardService.after(after);
};
