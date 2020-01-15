# node-local-require

[![npm version](https://badge.fury.io/js/%40larsthorup%2Flocal.svg)](https://www.npmjs.com/package/@larsthorup/local)
[![Build Status](https://travis-ci.org/larsthorup/node-local-require.png)](https://travis-ci.org/larsthorup/node-local-require)

Simplify requiring local modules

The purpose of this module is to make it easy to keep self-contained Node modules in the same repo as the rest of your app during initial development, in such a way that you can easily convert the module to be a real external module eventually. 


## Usage

    npm install @larsthorup/local --save

    var local = require('@larsthorup/local');
    var config = local('config');


## Verification

You can optionally declare local modules in dependency order in package.json. If so, local() will verify requests against the declaration, unless NODE_ENV is production:

    { 
      "config": {
        "@larsthorup/local": {
          "modules": [
            "core",
            "lib"
          ]
        }
      }
    }

    var util = local('util'); // Note: will throw an error

    var core = local('core'); // Note: will succeed if in some source file in lib
    
    var lib = local('lib'); // Note: will throw an error if in some source file in core 
