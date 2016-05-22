const path = require('path');
const local = require('..');

const sampleRoot = path.join(__dirname, 'sample');

describe('local', function () {

  it('should return a reference to the local module', function () {
    const lib = local('lib', sampleRoot);
    lib.answer().should.equal(42);
  });

});