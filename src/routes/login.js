const authentication = require('../helpers/authentication');
const LoginRoute = require('express').Router();

module.exports = () => {
    LoginRoute.get('/login', (req, res) => {
        if(authentication.authControl(req)){
           res.redirect('/myalbums');
        }
        res.render('login');
    });

    LoginRoute.post('/login', (req, res) => {
        let auth = authentication.login(req, res);
        if (auth) {
            res.redirect('/myalbums');
        }
    });

    return LoginRoute;
};