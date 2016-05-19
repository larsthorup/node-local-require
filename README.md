# node-local-require
Simplify requiring local modules

## Usage

    npm install @larsthorup/local --save

    var local = require('@larsthorup/local');
    var config = local('config');


## ToDo
* Specify dependencies in ${root}/package.json/config.local.dependencies
* Verify local() with specified dependencies
* Verify absense of cyclical dependencies
* Skip verification when NODE_ENV is 'production'