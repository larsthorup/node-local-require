var path = require('path');
var sample = require('./sample');

var sampleRoot = path.join(__dirname, 'sample');

describe('local', function () {

  it('should return a reference to the local module', function () {
    var lib = sample.local('lib');
    lib.answer().should.equal(42);
  });

  it('should fail to reference a module not configured', function () {
    var expectedMessage = '"util" is missing from config["@larsthorup/local"].dependencies in ' + path.join(sampleRoot, 'package.json');
    (function () { sample.local('util'); }).should.throw(expectedMessage);
  });

  it('should fail to reference a module that is not a dependency', function () {
    var expectedMessage = '"lib" is not declared as dependency of "core" in config["@larsthorup/local"].dependencies in ' + path.join(sampleRoot, 'package.json');
    (function () { sample.local('core'); }).should.throw(expectedMessage);
  });
  
});
