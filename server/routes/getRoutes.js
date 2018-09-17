const mongoose = require('mongoose');
const bm_crank = require('../models/bmart_crank');
const bm_hub = require('../models/bmart_hub');
const bm_dhframe = require('../models/bmart_dhframe');
const bm_enduroframe = require('../models/bmart_enduroframe');
const bm_wheel = require('../models/bmart_wheel');

module.exports = app => {
    app.get('/', (req, res) => {
        res.send({ crawler: 'standby app' });
    });
    app.get('/api/bm/run', (req, res) => {
        require('../server.js');
        console.log('running bikemarkt crawler...');
        res.send({ crawler: 'running' });
    });
    //<<dhframes
    app.get('/api/bm/category/dhframes/:skipRange/:pageLimit', async (req, res) => {
        var pageLimit = parseInt(req.params.pageLimit);
        var skipRange = parseInt(req.params.skipRange);
        const DhFrames = await mongoose
        .model('dhframes')
        .find()
        .skip(skipRange)
        .limit(pageLimit)
        .select({ bmartId: false, __v: false });
        res.send(DhFrames);            
    });
    app.get('/api/bm/category/dhframes', (req, res) => {
        mongoose.model('dhframes').count(function(err, dhframes) {
            res.send({ dhframes });
        });
    });
    app.post('/api/bm/category/dhframes/fav', async (req, res) => {
        console.log('fav to id: '+ req.body.id + ' / ' + req.body.userId);
        bm_dhframe.updateFavorite(req.body.id, req.body.markAs);
    })
    //>>dhframes
    //<<cranks
    app.get('/api/bm/category/cranks/:skipRange/:pageLimit', async (req, res) => {
        var pageLimit = parseInt(req.params.pageLimit);
        var skipRange = parseInt(req.params.skipRange);
        const Cranks = await mongoose
            .model('cranks')
            .find()
            .skip(skipRange)
            .limit(pageLimit)
            //.sort({'publishDate': -1})
            .select({ bmartId: false, __v: false });
        res.send(Cranks);            
    });
    app.get('/api/bm/category/cranks', (req, res) => {
        mongoose.model('cranks').count(function(err, cranks) {
            res.send({cranks});
        });
    });
    app.post('/api/bm/category/cranks/fav', async (req, res) => {
        console.log('fav to id: '+ req.body.id + ' / ' + req.body.userId);
        bm_crank.updateFavorite(req.body.id, req.body.markAs);
    })
    //>>cranks
    //<<enduroframes
    app.get('/api/bm/category/enduroframes/:skipRange/:pageLimit', async (req, res) => {
        var pageLimit = parseInt(req.params.pageLimit);
        var skipRange = parseInt(req.params.skipRange);
        const EnduroFrames = await mongoose
        .model('enduroframes')
        .find()
        .skip(skipRange)
        .limit(pageLimit)
        .select({ bmartId: false, __v: false });
        res.send(EnduroFrames);            
    });
    app.get('/api/bm/category/enduroframes', (req, res) => {
        mongoose.model('enduroframes').count(function(err, enduroframes) {
            res.send({ enduroframes });
        });
    });
    app.post('/api/bm/category/enduroframes/fav', async (req, res) => {
        console.log('fav to id: '+ req.body.id + ' / ' + req.body.userId);
        bm_enduroframe.updateFavorite(req.body.id, req.body.markAs);
    })
    //>>enduroframes
    //<<hubs
    app.get('/api/bm/category/hubs/:skipRange/:pageLimit', async (req, res) => {
        var pageLimit = parseInt(req.params.pageLimit);
        var skipRange = parseInt(req.params.skipRange);
        const Hubs = await mongoose
            .model('hubs')
            .find()
            .skip(skipRange)
            .limit(pageLimit)
            .select({ bmartId: false, __v: false });
        res.send(Hubs);            
    });
    app.get('/api/bm/category/hubs', (req, res) => {
        mongoose.model('hubs').count(function(err, hubs) {
            res.send({hubs});
        });
    });
    app.post('/api/bm/category/hubs/fav', async (req, res) => {
        console.log('fav to id: '+ req.body.id + ' / ' + req.body.userId);
        bm_hub.updateFavorite(req.body.id, req.body.markAs);
    })
    //>>hubs
    //<<wheels
    app.get('/api/bm/category/wheels/:skipRange/:pageLimit', async (req, res) => {
        var pageLimit = parseInt(req.params.pageLimit);
        var skipRange = parseInt(req.params.skipRange);
        const Wheels = await mongoose
            .model('wheels')
            .find()
            .skip(skipRange)
            .limit(pageLimit)
            .select({ bmartId: false, __v: false });
        res.send(Wheels);    
        console.log('wheels loadeds.');
    });
    app.get('/api/bm/category/wheels', (req, res) => {
        mongoose.model('wheels').count(function(err, wheels) {
            res.send({ wheels });
        });
    });
    app.post('/api/bm/category/wheels/fav', async (req, res) => {
        console.log('fav to id: '+ req.body.id + ' / ' + req.body.userId);
        bm_wheel.updateFavorite(req.body.id, req.body.markAs);
    })
    //>>wheels
};
