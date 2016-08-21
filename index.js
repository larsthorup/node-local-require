var path = require('path');
var stackTrace = require('stack-trace');

var defaultRoot = require('@larsthorup/root');

function local (moduleName, root) {
  root = root || defaultRoot;
  if (process.env.NODE_ENV != 'production') {
    var packagePath = path.join(root, 'package.json');
    var configSourceDescription = 'config["@larsthorup/local"].modules in ' + packagePath;
    var package = require(packagePath);
    var packageConfig = package ? package.config : null;
    var localConfig = packageConfig ? packageConfig['@larsthorup/local'] : null;
    var modules = localConfig ? localConfig.modules : null;
    if (modules) {
      var moduleIndex = modules.indexOf(moduleName);
      if (moduleIndex === -1) {
        throw new Error('"' + moduleName + '" is missing from ' + configSourceDescription);
      }
      var callerFile = stackTrace.get(local)[0].getFileName();
      var callerDir = path.dirname(callerFile);
      var callerDirRelativeToRoot = path.relative(root, callerDir);
      var callerModule = callerDirRelativeToRoot.split(path.sep)[0] || '';
      var callerIndex = modules.indexOf(callerModule);
      if (callerIndex === -1) {
        throw new Error('caller module "' + callerModule + '" is missing from ' + configSourceDescription);
      }
      if (callerIndex <= moduleIndex) {
        throw new Error('"' + callerModule + '" may not refer to "' + moduleName + '" as per ' + configSourceDescription);
      }
    }
  }
  return require(path.join(root, moduleName));
}

module.exports = local;
