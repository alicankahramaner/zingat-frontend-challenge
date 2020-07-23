const express = require('express');
const path = require('path');
// const authentication = require('./helpers/authentication');
const errorHandeller = require('./helpers/errorHandeller');
const config = require('../config');
const routeCompiler = require('./routeCompiler');

express.Router();

const app = express();
app.use(errorHandeller);

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../', config.source, 'views'));

routeCompiler(app);

//#region 404
app.all('*', (req, res) => {
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
});
//#endregion 404

app.listen(config.port, () => {
    console.log(`Listen to ${config.port}`);
});