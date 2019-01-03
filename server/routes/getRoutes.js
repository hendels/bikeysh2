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
const genMgt = require('../db_management/generalManagement');

//jobs
//functions
function mergeArrays(array1, array2) {
    const result_array = [];
    const arr = array1.concat(array2);
    let len = arr.length;
    const assoc = {};

    while(len--) {
        const item = arr[len];

        if(!assoc[item]) 
        { 
            result_array.unshift(item);
            assoc[item] = true;
        }
    }

    return result_array;
}

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
    app.get('/applyScores', (req, res) => {
        require('../jobs/jobs/addScores');
        res.send({ server: 'apply scores' });
    });
    app.get('/test', async (req, res) => {
        // genMgt.clearHidesFromScoringTable();
        //await genMgt.fillTagCounterInAllModels();
        // bm_dhframe.createTextIndexDHFrames();
        // const sender = await bm_dhframe.dhFramesSearch();
        console.log(`[DONE] ${sender}`);
    });
    //>>jobs
    //==================================================================================================================
    app.get('/api/bm/run', (req, res) => {
        require('../server.js');
        console.log('running bikemarkt crawler...');
        res.send({ crawler: 'running' });
    });
    //<<stats
    app.get('/api/statistics/similiarOffers/:manufacturerSetId/:modelSetId', async (req, res) => {
        //console.log(`in similiar...${req.params.manufacturerSetId} / ${req.params.modelSetId}`);
        await genMgt.findSimilarOffers(parseInt(req.params.manufacturerSetId), parseInt(req.params.modelSetId), scoreStats => {
            res.send({scoreStats});
        })
    })
    //>>
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
        //console.log(`searching for tag... + ${req.params.tagName} offer id: ${req.params.offerId}`);
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
        //console.log('update model to tag: '+ req.body.id + ' / ' + req.body.tagName + ' - setTagTo: ' + req.params.setTagTo);
        Tags.findOne({ offerId: req.body.id, tagName: req.body.tagName}).then(async existingTag => {
            console.log('existing TAg Id: '+ existingTag);
            if (existingTag) {

                const tagPairNo = await tagMgt.defineTagPair(req.body.id, req.body.tagName, req.params.setTagTo);
                tagMgt.updateModel(tags, existingTag, req.body.tagName, req.params.setTagTo, tagPairNo);

            } else {        
                var createTag = new Promise(async (resolve, reject) => {
                    await tags.create(req.body);
                    resolve();
                });
                createTag.then(() => {
                // console.log(`after create --- offerId: ${req.body.id} tagName: ${req.body.tagName}`);
                    Tags.findOne({ offerId: req.body.id, tagName: req.body.tagName}).then(async existingTag => {
                        if (existingTag) {
                            const tagPairNo = await tagMgt.defineTagPair(req.body.id, req.body.tagName, req.params.setTagTo);
                            tagMgt.updateModel(tags, existingTag, req.body.tagName, req.params.setTagTo, tagPairNo);
                            const tagCount = await mongoose.model('tags').count({offerId: req.body.id}, function(err, tags){return tags});
                            genMgt.updateTagCounter(req.body.id, req.body.model, tagCount);
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
    app.get('/api/tags/getTags/:offerId', async (req, res) => {
        const tagArray = await tagMgt.findTagsForOffer(req.params.offerId);
        res.send( {tagArray} );
    });
    app.post('/api/tags/deleteTag', async (req, res) => {
        tags.deleteTag('', req.body.offerId, req.body.tagName)
        res.send();
    });
    //>>
    //==================================================================================================================
    //<<general
    app.get('/scoring/:offerId', async (req, res) => {
        //console.log('searching for tag count for...' + req.params.offerId);
        await mongoose.model('scoring').find({offerId: req.params.offerId}, (err, scoring) => {
            res.send({ scoring });
            console.log('got scored offer...');
            // console.log(scoring);
        });
    });
    app.post('/api/bm/offer/fav', async (req, res) => {
        console.log('fav to id: '+ req.body.id + ' / ' + req.body.model);
        const model = req.body.model.toLowerCase();
        genMgt.updateFavorite(req.body.id, model, favorite => {
            res.send(favorite);
            console.log(`favorite send = ${favorite}`)
        });
    })
    app.get('/api/search/:searchText', async (req, res) => {
        const dhFramesResult = await bm_dhframe.dhFramesSearch(req.params.searchText, 3);
        let searchResults = [];
        for (let i = 0 ; i < dhFramesResult.length; i++){
            // console.log(result.dhFramesResult[i].title);
            let searchItem = {
                title: dhFramesResult[i].title,
                bmartId: dhFramesResult[i].bmartId,
                publishDate: dhFramesResult[i].publishDate,
                category: 'DH Frames'

            }
            searchResults.push(searchItem);
        }
        const enduroFramesResult = await bm_dhframe.dhFramesSearch(req.params.searchText, 3);
        for (let i = 0 ; i < enduroFramesResult.length; i++){
            // console.log(result.dhFramesResult[i].title);
            let searchItem = {
                title: enduroFramesResult[i].title,
                bmartId: enduroFramesResult[i].bmartId,
                publishDate: enduroFramesResult[i].publishDate,
                category: 'Enduro Frames'

            }
            searchResults.push(searchItem);
        }
        res.send({ searchResults });
    });
    

    //>>
    //==================================================================================================================
    //<<scoring
    app.get('/api/scoring/update/visibility/:offerId', async (req, res) => {
        //console.log('searching for tag count for...' + req.params.offerId);
        await mongoose.model('scoring').find({offerId: req.params.offerId}, (err, record) => {

            scoring.updateVisibility(record[0]._id, visible => {
                res.send(visible)
            });
        });
    });
    //>>
    //==================================================================================================================
    //<<offerList
    app.get('/api/bm/category/:model/:skipRange/:pageLimit/:favFilter/:withoutTagsFilter', async (req, res) => {
        let favFilter = (req.params.favFilter === `true`);
        let withoutTagsFilter = (req.params.withoutTagsFilter === `true`);
        console.log(`favorite  filter: ${favFilter}`);
        console.log(`withoutTags filter: ${withoutTagsFilter}`);
        var pageLimit = parseInt(req.params.pageLimit);
        var skipRange = parseInt(req.params.skipRange);
        let filters = {}
        if (favFilter){
            filters = {
                favorite: favFilter !== null ? favFilter : null,
            }
        }
        if (withoutTagsFilter){
            filters = {
                tagCount: withoutTagsFilter === true ? {$lt: 2} : null
            }
        }
        // if (favFilter){
            const currentModel = await mongoose
                .model(req.params.model)
                .find(filters)
                .sort({'bmartId': -1})
                .skip(skipRange)
                .limit(pageLimit)
                .select({ __v: false });

            res.send(currentModel);   
        // }else{
        //     const DhFrames = await mongoose
        //     .model(req.params.model)
        //     .find()
        //     .sort({'bmartId': -1})
        //     .skip(skipRange)
        //     .limit(pageLimit)
        //     .select({ __v: false });
        //     res.send(DhFrames);            
        // }
        
    });
    //>>offerList
    //<<dhframes
    app.get('/api/bm/category/dhframes', (req, res) => {
        mongoose.model('dhframes').count(function(err, dhframes) {
            res.send({ dhframes });
        });
    });
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
    // app.get('/api/bm/category/cranks/:skipRange/:pageLimit', async (req, res) => {
    //     var pageLimit = parseInt(req.params.pageLimit);
    //     var skipRange = parseInt(req.params.skipRange);
    //     const Cranks = await mongoose
    //         .model('cranks')
    //         .find()
    //         .skip(skipRange)
    //         .limit(pageLimit)
    //         //.sort({'publishDate': -1})
    //         .select({ bmartId: false, __v: false });
    //     res.send(Cranks);            
    // });
    app.get('/api/bm/category/cranks', (req, res) => {
        mongoose.model('cranks').count(function(err, cranks) {
            res.send({cranks});
        });
    });
    //>>cranks
    //==================================================================================================================
    //<<bestoffer
    app.get('/scoring/category/:category', async (req, res) => {
        console.log('in scoring/cat');
        const Scoring = await mongoose
            .model('scoring')
            .find({
                category: req.params.category,
                urlActive: true,
                showOffer: true,
                countTotal: {$gt: 1}
            })
            .select({ __v: false });
        //console.log(Scoring);
        var obj_ids = Scoring.map(id => {return id.offerId;});
        const Model = await mongoose
            .model(req.params.category)
            .find({_id: {$in: obj_ids}})
            .select({ __v: false }); 
        res.send(Model);       
    });
    app.get('/api/bm/bestoffer/:category/:skipRange/:pageLimit', async (req, res) => {
        var pageLimit = parseInt(req.params.pageLimit);
        var skipRange = parseInt(req.params.skipRange);
        const Scoring = await mongoose
            .model('scoring')
            .find({
                category: req.params.category,
                urlActive: true,
                showOffer: true,
                countTotal: {$gt: 1}
            })
            .sort({'scores': -1})
            .skip(skipRange)
            .limit(pageLimit)
            .select({ __v: false });
        var obj_ids = Scoring.map(id => {return id.offerId;});
        const Model = await mongoose
            .model(req.params.category)
            .find({_id: {$in: obj_ids}})
            .limit(pageLimit)
            .select({ __v: false }); 
        res.send(Model);       
    });
    //>>bestoffer
    //==================================================================================================================
    //<<enduroframes
    // app.get('/api/bm/category/enduroframes/:skipRange/:pageLimit', async (req, res) => {
    //     var pageLimit = parseInt(req.params.pageLimit);
    //     var skipRange = parseInt(req.params.skipRange);
    //     const EnduroFrames = await mongoose
    //     .model('enduroframes')
    //     .find()
    //     .skip(skipRange)
    //     .limit(pageLimit)
    //     .select({ bmartId: false, __v: false });
    //     res.send(EnduroFrames);            
    // });
    app.get('/api/bm/category/enduroframes', (req, res) => {
        mongoose.model('enduroframes').count(function(err, enduroframes) {
            res.send({ enduroframes });
        });
    });
    //>>enduroframes
    //==================================================================================================================
    //<<hubs
    // app.get('/api/bm/category/hubs/:skipRange/:pageLimit', async (req, res) => {
    //     var pageLimit = parseInt(req.params.pageLimit);
    //     var skipRange = parseInt(req.params.skipRange);
    //     const Hubs = await mongoose
    //         .model('hubs')
    //         .find()
    //         .skip(skipRange)
    //         .limit(pageLimit)
    //         .select({ bmartId: false, __v: false });
    //     res.send(Hubs);            
    // });
    app.get('/api/bm/category/hubs', (req, res) => {
        mongoose.model('hubs').count(function(err, hubs) {
            res.send({hubs});
        });
    });
    //>>hubs
    //==================================================================================================================
    //<<wheels
    // app.get('/api/bm/category/wheels/:skipRange/:pageLimit', async (req, res) => {
    //     var pageLimit = parseInt(req.params.pageLimit);
    //     var skipRange = parseInt(req.params.skipRange);
    //     const Wheels = await mongoose
    //         .model('wheels')
    //         .find()
    //         .skip(skipRange)
    //         .limit(pageLimit)
    //         .select({ bmartId: false, __v: false });
    //     res.send(Wheels);    
    //     console.log('wheels loadeds.');
    // });
    app.get('/api/bm/category/wheels', (req, res) => {
        mongoose.model('wheels').count(function(err, wheels) {
            res.send({ wheels });
        });
    });
    //>>wheels
};
