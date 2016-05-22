var path = require('path');
var stackTrace = require('stack-trace');

// Note: we assume that local-require is installed from package.json in the root folder
var defaultRoot = path.join(__dirname, '../../..');

function local (moduleName, root) {
  root = root || defaultRoot;
  if (process.env.NODE_ENV != 'production') {
    var packagePath = path.join(root, 'package.json');
    var package = require(packagePath);
    var packageConfig = package ? package.config : null;
    var localConfig = packageConfig ? packageConfig['@larsthorup/local'] : null;
    var deps = localConfig ? localConfig.dependencies : null;
    if (deps) {
      if (!deps.hasOwnProperty(moduleName)) {
        throw new Error('"' + moduleName + '" is missing from config["@larsthorup/local"].dependencies in ' + packagePath);
      }
      var callerFile = stackTrace.get(local)[0].getFileName();
      var callerDir = path.dirname(callerFile);
      var callerDirRelativeToRoot = path.relative(root, callerDir);
      var callerModule = callerDirRelativeToRoot.split(path.sep)[0] || null;
      var callerDeps = deps[callerModule] || null;
      if (callerDeps) {
        if (callerDeps.indexOf(moduleName) === -1) {
          throw new Error('"' + moduleName + '" is not declared as dependency of "' + callerModule + '" in config["@larsthorup/local"].dependencies in ' + packagePath);
        }
      }
    }
  }
  return require(path.join(root, moduleName));
}

module.exports = local;
