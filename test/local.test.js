var path = require('path');
var sample = require('./sample');
var loop = require('./loop');

var sampleConfigDescription = 'config["@larsthorup/local"].dependencies in ' + path.join(__dirname, 'sample', 'package.json');
var loopConfigDescription = 'config["@larsthorup/local"].dependencies in ' + path.join(__dirname, 'loop', 'package.json');

describe('local', function () {

  it('should return a reference to the local module', function () {
    var lib = sample.local('lib');
    lib.answer().should.equal(42);
  });

  it('should fail to reference a module not configured', function () {
    var expectedMessage = '"util" is missing from ' + sampleConfigDescription;
    (function () { sample.local('util'); }).should.throw(expectedMessage);
  });

  it('should fail to reference a module that is not a dependency', function () {
    var expectedMessage = '"lib" is not declared as dependency of "core" in ' + sampleConfigDescription;
    (function () { sample.local('core'); }).should.throw(expectedMessage);
  });

  it('should fail to accept cyclical references', function () {
    var expectedMessage = '"lib" and "core" cannot both refer to each other in ' + loopConfigDescription;
    (function () { loop.local('core'); }).should.throw(expectedMessage);
  });

});
