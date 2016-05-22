var local = require('../..');

var root = __dirname;

module.exports = {
  local: function (module) {
    return local(module, root);
  }
};
