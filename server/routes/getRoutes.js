//dependencies
const mongoose = require('mongoose');
var cron = require('node-cron');
//models
const bm_crank = require('../models/bmart_crank');
const bm_hub = require('../models/bmart_hub');
const bm_dhframe = require('../models/bmart_dhframe');
const bm_enduroframe = require('../models/bmart_enduroframe');
const bm_wheel = require('../models/bmart_wheel');
const tags = require('../models/tags');
const globalSetup = require('../models/global_setup');
const scoring = require('../models/scoring');
const Tags = mongoose.model('tags');
// const Scoring = mongoose.model('scoring');
//management
const tagMgt = require(`../db_management/tagManagement`);
//jobs
// fillTagsJob = require('../jobs/jobs/fillTags');

module.exports = app => {
    //<<jobs
    app.get('/fillTags', (req, res) => {
        require('../jobs/jobs/fillTags');
        res.send({ server: 'filling tags' });
    });
    app.get('/api/createSetup', (req, res) => {
        let counter = 0;
        globalSetup.createSetup();
        res.send({ server: 'creating setup' });
    });
    app.get('/fillNameSets', (req, res) => {
        require('../jobs/jobs/fillNameSets');
        res.send({ server: 'filling nameSets' });
    });
    app.get('/fillScoring', (req, res) => {
        require('../jobs/jobs/fillScoring');
        res.send({ server: 'filling scoring' });
    });
    app.get('/test', (req, res) => {
        findExistingPair('Race');
    });
    //>>jobs
    //==================================================================================================================
    app.get('/api/bm/run', (req, res) => {
        require('../server.js');
        console.log('running bikemarkt crawler...');
        res.send({ crawler: 'running' });
    });
    //<<tags
    app.post('/api/tags/create', (req, res) => {
        console.log('im in tags');
        Tags.findOne({ name: req.body.name }).then(existingId => {
            console.log('existing Id: '+ existingId);
            if (existingId) {
                tags.update(Tags, existingId.id, req.body);
            } else {                
                tags.create(req.body);
            }        
        })
    });
    app.get('/api/tags/findTag/:tagName/:offerId', (req, res) => {
        console.log(`searching for tag... + ${req.params.tagName} offer id: ${req.params.offerId}`);
        Tags.findOne({ offerId: req.params.offerId, tagName: req.params.tagName }).then(existingTag => {
            //console.log('existing Id: '+ existingId);
            if (existingTag) {
                res.send(existingTag);
            } else {                
                res.send(null);
            }        
        })

    });
    app.post('/api/tags/update/:setTagTo', async (req, res) => {
        console.log('update model to tag: '+ req.body.id + ' / ' + req.body.tagName + ' - setTagTo: ' + req.params.setTagTo);
        Tags.findOne({ offerId: req.body.id, tagName: req.body.tagName}).then(async existingTag => {
            console.log('existing TAg Id: '+ existingTag);
            if (existingTag) {

                const tagPairNo = await tagMgt.defineTagPair(req.body.id, req.body.tagName, req.params.setTagTo)
                tagMgt.updateModel(tags, existingTag, req.body.tagName, req.params.setTagTo, tagPairNo);

            } else {        
                var createTag = new Promise(async (resolve, reject) => {
                    await tags.create(req.body);
                    resolve();
                  });
                createTag.then(() => {
                // console.log(`after create --- offerId: ${req.body.id} tagName: ${req.body.tagName}`);
                    Tags.findOne({ offerId: req.body.id, tagName: req.body.tagName}).then(async existingTag => {
                        // console.log(`existingTag: `);
                        // console.log(existingTag);
                        if (existingTag) {
                            // console.log(`tag ${req.body.tagName} update after create!`);
                            const tagPairNo = await tagMgt.defineTagPair(req.body.id, req.body.tagName, req.params.setTagTo);
                            tagMgt.updateModel(tags, existingTag, req.body.tagName, req.params.setTagTo, tagPairNo);
                            res.send(existingTag.tagName);
                        }
                    });  
                })
            }        
        })
    })
    app.get('/api/tags/tagCount/:offerId', (req, res) => {
        //console.log('searching for tag count for...' + req.params.offerId);
        mongoose.model('tags').count({offerId: req.params.offerId}, function(err, tags) {
            res.send({ tags });
        });
    });
    //>>
    //==================================================================================================================
    //<<general
    app.get('/api/scoring/:offerId', async (req, res) => {
        //console.log('searching for tag count for...' + req.params.offerId);
        await mongoose.model('scoring').find({offerId: req.params.offerId}, (err, scoring) => {
            res.send({ scoring });
            console.log('got scored offer...')
        });
    });

    //>>
    //==================================================================================================================
    //<<dhframes
    app.get('/api/bm/category/dhframes/:skipRange/:pageLimit', async (req, res) => {
        var pageLimit = parseInt(req.params.pageLimit);
        var skipRange = parseInt(req.params.skipRange);
        const DhFrames = await mongoose
        .model('dhframes')
        .find()
        .skip(skipRange)
        .limit(pageLimit)
        .select({ __v: false });
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
    app.get('/api/bm/category/dhframes/bestOffer/:pageLimit', async (req, res) => {
        var pageLimit = parseInt(req.params.pageLimit);
        const Dhframes = await mongoose
            .model('dhframes')
            .find()
            .limit(pageLimit)
            .sort({'publishDate': -1})
            .select({ __v: false });
        res.send(Dhframes);            
    });
    //>>dhframes
    //==================================================================================================================
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
    app.get('/api/bm/bestoffer/:category/:pageLimit', async (req, res) => {
        var pageLimit = parseInt(req.params.pageLimit);
        const Scoring = await mongoose
            .model('scoring')
            .find({category: req.params.category})
            // .limit(pageLimit)
            .sort({'price': -1})
            .select({ __v: false });
        var obj_ids = Scoring.map(id => {return id.offerId;});
        const Model = await mongoose
            .model(req.params.category)
            .find({_id: {$in: obj_ids}})
            .limit(pageLimit)
            .select({ __v: false }); 
        res.send(Model);       
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
    app.get('/api/bm/category/hubs/bestOffer/:pageLimit', async (req, res) => {
        var pageLimit = parseInt(req.params.pageLimit);
        const Hubs = await mongoose
            .model('hubs')
            .find()
            .limit(pageLimit)
            .sort({'publishDate': -1})
            .select({ bmartId: false, __v: false });
        res.send(Hubs);            
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
    app.post('/api/bm/category/wheels/fav', async (req, res) => {
        console.log('fav to id: '+ req.body.id + ' / ' + req.body.userId);
        bm_wheel.updateFavorite(req.body.id, req.body.markAs);
    })
    //>>wheels
};
