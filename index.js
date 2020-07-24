const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authentication = require('./src/helpers/authentication');
const errorHandeller = require('./src/helpers/errorHandeller');
const config = require('./src/helpers/config');
const routeCompiler = require('./src/routeCompiler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(config.source, 'views'));
app.use(errorHandeller);

// app.use(require('./src/routes/login'));

const secure = (req, res, next) => {
    authentication.checkAuth(req, res, next);
}

routeCompiler(app, secure)

//#region 404
app.use('*', (req, res) => {
    res.status(404);

    if (req.accepts('html')) {
        res.render('404');
        return;
    }

    if (req.accepts('json')) {
        res.send({
            error: 404,
            message: 'Bulunamadı, isteğinizi düzeltirseniz daha iyi olacaktır.'
        });
    }

    res.send('Not Found');
});
//#endregion 404

app.listen(config.port, () => {
    console.log(`Listen to ${config.port}`);
});