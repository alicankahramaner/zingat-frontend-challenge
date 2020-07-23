const home = (app) => {
    app.get('/', (req, res, next) => {
        res.render('index', {
            title: 'Zingat-Test',
            message: 'Hello'
        });
    });
}


module.exports = home;