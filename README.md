# node-local-require

Simplify requiring local modules

The purpose of this module is to make it easy to keep self-contained Node modules in the same repo as the rest of your app during initial development, in such a way that you can easily convert the module to be a real external module eventually. 


## Usage

    npm install @larsthorup/local --save

    var local = require('@larsthorup/local');
    var config = local('config');


## Verification

You can optionally declare local modules and their dependencies in package.json. If so, local() will verify requests against the declaration, unless NODE_ENV is production:

    { 
      "config": {
        "@larsthorup/local": {
          "dependencies": {
            "core": [],
            "lib": ["core"]
          }
        }
      }
    }

    var util = local('util'); // Note: will throw an error
    
    var lib = local('lib'); // Note: will throw an error if in some source file in core 

Also, cyclical dependencies are rejected.