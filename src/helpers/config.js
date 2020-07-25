const configFile = require('../../config.json');

let config = {
    source: configFile.source,
    destination: configFile.destination,
    port: 3000,
    env: 'dev'
};

let mode = process.env.mode;
console.log(process.env.PORT);
switch (mode) {
    case 'dev':
        config.port = configFile.dev.port;
        break;
    case 'prod':
        config.port = process.env.PORT || configFile.prod.port;
        config.env = 'prod'
        break;
    default:
        console.log('Hatalı env key');
        process.exit(1);
}

module.exports = config;