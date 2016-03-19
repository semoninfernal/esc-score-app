import bookshelf from '../../bookshelf';
import Role from './role-model';

export default bookshelf.model('User', {
  tableName: 'users',
  roles: function() {
    return this.belongsToMany('Role', 'users_roles');
  }
});
