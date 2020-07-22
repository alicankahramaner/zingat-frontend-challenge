const express = require('express');
const path = require('path');
const authentication = require('./helpers/authentication');
const errorHandeller = require('./helpers/errorHandeller');
const config = require('../config');

express.Router();

const app = express();
app.use(errorHandeller);

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../', config.source, 'views'));

app.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Zingat-Test',
        message: 'Hello'
    });
});

app.use(function (req, res) {
    res.status(404);

    if (req.accepts('html')) {
        res.render('404');
        return;
    }

    if (req.accepts('json')) {
        res.send({ error: 'Not Found' });
        return;
    }

    res.type('txt').send('Not found');
});

app.listen(config.port, () => {
    console.log(`Listen to ${config.port}`);
});