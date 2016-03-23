import Bookshelf from './index';
import clone from 'lodash/clone';

const toJson = Bookshelf.Model.prototype.toJSON;

const BaseModel = Bookshelf.Model.extend({
  toJSON: function(options = {}) {
    console.log('toJSON');
    return toJson.call(this, {
      ...options,
      //omitPivot: true
    })
  },
  serialize: function(options = {}) {
    console.log('serialize');
    var attrs = clone(this.attributes);
    if (options && options.shallow) return attrs;
    var relations = this.relations;
    for (var key in relations) {
      var relation = relations[key];
      attrs[key] = relation.toJSON ? relation.toJSON(options) : relation;
    }
    if (options && options.omitPivot) return attrs;
    if (this.pivot) {
      var pivot = this.parse(this.pivot.attributes); // <-- Added parse here
      for (key in pivot) {
        attrs['_pivot_' + key] = pivot[key];
      }
    }
    return attrs;
    //return Bookshelf.Model.prototype.serialize.call(this, options);
  }
});

export default BaseModel;
