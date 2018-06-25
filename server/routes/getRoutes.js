const mongoose = require('mongoose');

module.exports = app => {
    app.get('/', (req, res) => {
        res.send({ crawler: 'standby app' });
    });
    app.get('/api/bm/run', (req, res) => {
        require('../server.js');
        res.send({ crawler: 'running' });
    });
    app.get('/api/bm/category/dhframes', (req, res) => {
        mongoose.model('dhframes').find(function(err, dhframes) {
            res.send({ dhframes });
        });
    });
    app.get('/api/bm/category/cranks', async (req, res) => {
        const Cranks = await mongoose
            .model('cranks')
            .find()
            .select({ bmartId: false, __v: false });
        res.send(Cranks);
    });
    app.get('/api/bm/category/enduroframes', (req, res) => {
        mongoose.model('enduroframes').find(function(err, enduroframes) {
            res.send({ enduroframes });
        });
    });
    app.get('/api/bm/category/hubs', (req, res) => {
        mongoose.model('hubs').find(function(err, hubs) {
            res.send({ hubs });
        });
    });
    app.get('/api/bm/category/wheels', (req, res) => {
        mongoose.model('wheels').find(function(err, wheels) {
            res.send({ wheels });
        });
    });
};
