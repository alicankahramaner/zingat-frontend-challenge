const http = require('../helpers/http');
const { ResponseType } = require('../helpers/common');
const MyAlbumsroute = require('express').Router();

module.exports = (secure = Function) => {
    MyAlbumsroute.get('/myalbums', secure, (req, res) => {
        res.render('myalbums');
    });

    MyAlbumsroute.post('/myalbums', secure, async (req, res) => {

        let data = await http.get('https://jsonplaceholder.typicode.com/albums');

        if (data && req.body.size) {
            data.length = req.body.size;
        }

        res.send(ResponseType(data));
    });

    MyAlbumsroute.post('/getAlbum', secure, async (req, res) => {
        let id = req.body.albumId;

        if (!id) {
            res.statusCode = 400;
            res.send(ResponseType([], false, 200, { message: 'albumId boş geçilemez', code: 400 }));
            return;
        }
        let data = await http.get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`);
        
        if (req.body['size'] !== undefined) {
            data.length = req.body.size;
        }

        res.send(ResponseType(data));

    });


    return MyAlbumsroute;
}