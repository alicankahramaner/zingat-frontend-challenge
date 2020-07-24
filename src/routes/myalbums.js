const MyAlbumsroute = require('express').Router();

module.exports = (secure = Function) => {
    MyAlbumsroute.get('/myalbums', secure, (req, res) => {
        res.render('myalbums');
    });

    return MyAlbumsroute;
}