var path = require('path');
var sample = require('./sample');

var sampleConfigDescription = 'config["@larsthorup/local"].modules in ' + path.join(__dirname, 'sample', 'package.json');

describe('local', function () {
  it('should return a reference to the local module', function () {
    var lib = sample.local('lib');
    lib.answer().should.equal(42);
  });

  it('should fail to reference a module not configured', function () {
    var expectedMessage = '"util" is missing from ' + sampleConfigDescription;
    (function () { sample.local('util'); }).should.throw(expectedMessage);
  });

  it('should fail to reference a module later in the module list', function () {
    var expectedMessage = '"core" may not refer to "lib" as per ' + sampleConfigDescription;
    (function () { sample.local('core'); }).should.throw(expectedMessage);
  });
});
