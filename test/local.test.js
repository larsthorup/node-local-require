var path = require('path');
var local = require('..');

var sampleRoot = path.join(__dirname, 'sample');

describe('local', function () {

  it('should return a reference to the local module', function () {
    var lib = local('lib', sampleRoot);
    lib.answer().should.equal(42);
  });

  it('should fail to reference a module not configured', function () {
    var expectedMessage = '"util" is missing from config["@larsthorup/local"].dependencies in ' + path.join(sampleRoot, 'package.json');
    (function () { local('util', sampleRoot); }).should.throw(expectedMessage);
  });

});
