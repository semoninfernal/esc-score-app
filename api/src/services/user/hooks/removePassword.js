'use strict';

module.exports = function() {
  return function(hook) {
    console.log('remove password hook');
    delete hook.result.dataValues.password;

    return hook;
  }
};
