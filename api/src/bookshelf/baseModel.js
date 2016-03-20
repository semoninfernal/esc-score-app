import Bookshelf from './index';

const toJson = Bookshelf.Model.prototype.toJSON;

const BaseModel = Bookshelf.Model.extend({
  toJSON: function(options = {}) {
    return toJson.call(this, {
      ...options,
      omitPivot: true
    })
  }
});

export default BaseModel;
