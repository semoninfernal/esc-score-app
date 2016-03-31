import authentication from 'feathers-authentication';


export default function() {
  const app = this;
  let config = {
    ...app.get('auth'),
    idField: 'id',
    usernameField: 'username'
  };

  app.set('auth', config);
  app.configure(authentication(config));
}
