const HomeRoute = require('express').Router();

module.exports = (secure = Function) => {
    HomeRoute.get('/', (req, res) => {
        res.render('index');
    });
    return HomeRoute;
};