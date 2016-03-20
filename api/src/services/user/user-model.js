import bookshelf from '../../bookshelf';
import BaseModel from '../../bookshelf/baseModel';
import Role from './role-model';

const UserModel = BaseModel.extend({
  tableName: 'users',
  hasTimestamps: true,
  roles: function() {
    return this.belongsToMany('Role', 'users_roles');
  }
})

export default bookshelf.model('User', UserModel);
