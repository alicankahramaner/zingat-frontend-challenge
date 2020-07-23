const homeRoute = require('./routes/home');

const routes = [
    homeRoute
];

module.exports = (app) => {
    routes.forEach(route => {
        if (typeof route !== 'function') {
            return;
        }
        route(app);
    });
}