var path = require('path');
var stackTrace = require('stack-trace');

var defaultRoot = require('@larsthorup/root');

function local (moduleName, root) {
  root = root || defaultRoot;
  if (process.env.NODE_ENV != 'production') {
    var packagePath = path.join(root, 'package.json');
    var configSourceDescription = 'config["@larsthorup/local"].dependencies in ' + packagePath;
    var package = require(packagePath);
    var packageConfig = package ? package.config : null;
    var localConfig = packageConfig ? packageConfig['@larsthorup/local'] : null;
    var deps = localConfig ? localConfig.dependencies : null;
    if (deps) {
      var moduleDeps = deps[moduleName] || null;
      if (!moduleDeps) {
        throw new Error('"' + moduleName + '" is missing from ' + configSourceDescription);
      }
      var callerFile = stackTrace.get(local)[0].getFileName();
      var callerDir = path.dirname(callerFile);
      var callerDirRelativeToRoot = path.relative(root, callerDir);
      var callerModule = callerDirRelativeToRoot.split(path.sep)[0] || null;
      var callerDeps = deps[callerModule] || null;
      if (callerDeps) {
        if (callerDeps.indexOf(moduleName) === -1) {
          throw new Error('"' + moduleName + '" is not declared as dependency of "' + callerModule + '" in ' + configSourceDescription);
        }
        if (moduleDeps.indexOf(callerModule) > -1) {
          throw new Error('"' + moduleName + '" and "' + callerModule + '" cannot both refer to each other in ' + configSourceDescription);
        }
      }
    }
  }
  return require(path.join(root, moduleName));
}

module.exports = local;
