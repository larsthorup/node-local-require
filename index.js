var path = require('path');

// Note: we assume that local-require is installed from package.json in the root folder
var defaultRoot = path.join(__dirname, '../../..');

function checkDeps (moduleName, root) {
  var packagePath = path.join(root, 'package.json');
  var package = require(packagePath);
  var packageConfig = package ? package.config : null;
  var localConfig = packageConfig ? packageConfig['@larsthorup/local'] : null;
  var deps = localConfig ? localConfig.dependencies : null;
  if (deps && !deps.hasOwnProperty(moduleName)) {
    throw new Error('"' + moduleName + '" is missing from config["@larsthorup/local"].dependencies in ' + packagePath);
  }
}

function local (moduleName, root) {
  root = root || defaultRoot;
  if (process.env.NODE_ENV != 'production') checkDeps(moduleName, root);
  return require(path.join(root, moduleName));
}

module.exports = local;
