const path = require('path');

const root = path.join(__dirname, '../../..'); // Note: this assumes that local-require is installed from package.json in the root folder

module.exports = function (pathRelativeToRoot, specificRoot) {
  specificRoot = specificRoot || root;
  return require(path.join(specificRoot, pathRelativeToRoot));
}
