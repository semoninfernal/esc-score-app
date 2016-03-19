import bookshelf from '../../bookshelf';
import User from './user-model';

export default bookshelf.model('Role', {
  tableName: 'roles',
  users: function() {
    return this.belongsToMany('User', 'users_roles');
  }
});
