import bookshelf from '../../../bookshelf';
import BaseModel from '../../../bookshelf/baseModel';
import Role from './role';

const UserModel = BaseModel.extend({
  tableName: 'users',
  hasTimestamps: true,
  roles: function() {
    return this.belongsToMany('Role', 'users_roles');
  },
  events: function() {
    return this.belongsToMany('Event');
  },
  toJSON: function(options) {
    delete this.attributes.password;
    return BaseModel.prototype.toJSON.call(this);
  }
})

export default bookshelf.model('User', UserModel);
