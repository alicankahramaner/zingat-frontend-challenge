const authentication = require('../helpers/authentication');
const { ResponseType, isNullOrUndefinedOrEmpty } = require('../helpers/common');
const LoginRoute = require('express').Router();

module.exports = () => {
    LoginRoute.get('/login', (req, res) => {
        if (authentication.authControl(req)) {
            res.redirect('/myalbums');
        }
        res.render('login');
    });

    LoginRoute.post('/login', (req, res) => {
        let data = req.body;
        
        if (isNullOrUndefinedOrEmpty(data.username) || isNullOrUndefinedOrEmpty(data.password)) {
            res.send(ResponseType(
                false,
                false,
                401,
                {
                    code: 400,
                    message: 'username ve password zorunlu alandır.'
                }
            ))
            return;
        }

        let auth = authentication.login(data, res);
        res.send(ResponseType(
            auth,
            auth ? true : false,
            auth ? 200 : 401,
            !auth ? {
                code: 401,
                message: 'Hatalı kullanıcı adı veya şifre'
            } : null
        ));
    });

    return LoginRoute;
};