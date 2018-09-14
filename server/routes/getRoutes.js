const mongoose = require('mongoose');

module.exports = app => {
    app.get('/', (req, res) => {
        res.send({ crawler: 'standby app' });
    });
    app.get('/api/bm/run', (req, res) => {
        require('../server.js');
        console.log('running bikemarkt crawler...')
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
    //>>wheels
};
