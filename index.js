const path = require('path');

module.exports = function (pathRelativeToRoot) {
  var root = '../..'; // Note: this assumes that local-require is installed from package.json in the root folder
  return require(path.join(__dirname, root, pathRelativeToRoot));
}
