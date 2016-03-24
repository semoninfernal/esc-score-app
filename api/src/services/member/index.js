import service from 'feathers-knex';
import MemberService from './member-service';
import { before, after } from './hooks';
import { members } from '../names';

export default function() {
  const app = this;

  const options = {
    Model: app.get('knex'),
    name: 'event_members',
    paginate: {
      default: false,
    }
  };

  app.use(members, new MemberService(options));

  const memberService = app.service(members);

  memberService.before(before);
  memberService.after(after);
};
