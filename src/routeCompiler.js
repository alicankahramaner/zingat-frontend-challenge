const routes = [
    require('./routes/home'),
    require('./routes/login'),
    require('./routes/myalbums')
];

module.exports = (app, secure = Function) => {
    return routes.map(route => {
        if (typeof route !== 'function') {
            return;
        }
        app.use(route(secure));
    });
}