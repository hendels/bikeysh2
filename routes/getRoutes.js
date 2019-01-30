//dependencies
const mongoose = require('mongoose');
var cron = require('node-cron');
//models
const bm_crank = require('../models/bmart_crank');
const bm_hub = require('../models/bmart_hub');
const bm_dhframe = require('../models/bmart_dhframe');
const bm_enduroframe = require('../models/bmart_enduroframe');
const bm_wheel = require('../models/bmart_wheel');
const users = require('../models/users');
const tags = require('../models/tags');
const globalSetup = require('../models/global_setup');
const scoring = require('../models/scoring');
const Tags = mongoose.model('tags');
//management
const tagMgt = require(`../db_management/tagManagement`);
const genMgt = require('../db_management/generalManagement');
const userMgt = require('../db_management/userManagement');
//translate
const translateAPI = require('./testTranslateAPI.js')

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
        //######################
        // genMgt.clearHidesFromScoringTable();
        //await genMgt.fillTagCounterInAllModels();
        // bm_dhframe.createTextIndexDHFrames();
        // const sender = await bm_dhframe.dhFramesSearch();
        //const translate = translateAPI.
        //######################
        //translateAPI.translateAPI('tekst do przetłumaczenia', 'eng');
        //######################
        // var data = {        
        //     name: "demo 1",
        //     login: 'demo1',
        //     password: 'qwe123!',
        //     permissionSet: `admin`,
        // }
        // users.createUser(data);
        console.log(`[DONE] `);
        //######################
    });
    
    //>>jobs
    //==================================================================================================================
    //<<translations
    app.post('/api/translate', async (req, res) => {
        translateAPI.translateAPI(req.body.toTranslate, req.body.language, translated => {
            console.log(`Translation: ${translated}`);
            res.send(translated);

        });
    });
    //>>
    //==================================================================================================================
    //==================================================================================================================
    //<user
    app.post('/api/authenticate', async (req, res) => {
         
        userMgt.loginUser(req.body.login, req.body.password, userExist => {
            res.send(userExist);
        });
    });
    //>>
    //==================================================================================================================
    app.get('/api/bm/run', (req, res) => {
        require('../server.js');
        console.log('running bikemarkt crawler...');
        res.send({ crawler: 'running' });
    });
    //<<stats
    app.get('/api/statistics/similiarOffers/:manufacturerSetId/:modelSetId', async (req, res) => {
        console.log(`manufacturerSetId: ${req.params.manufacturerSetId} modelSetId: ${req.params.modelSetId}`);
        if (req.params.manufacturerSetId !== undefined && req.params.modelSetId !== undefined)
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
        Tags.findOne({ offerId: req.params.offerId, tagName: req.params.tagName }).then(existingTag => {
            if (existingTag) {
                res.send(existingTag);
            } else {                
                res.send(null);
            }        
        })

    });
    app.post('/api/tags/update/:setTagTo', async (req, res) => {
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
        await mongoose.model('scoring').find({offerId: req.params.offerId}, (err, scoring) => {
            res.send({ scoring });
            console.log(`got scored offer ${req.params.offerId}...`);
        });
    });
    app.post('/api/bm/offer/fav', async (req, res) => {
        console.log('fav to id: '+ req.body.id + ' / ' + req.body.model);
        
        genMgt.updateFavorite(req.body.id, req.body.model, favorite => {
            res.send(favorite);
            console.log(`favorite send = ${favorite}`)
        });
    })
    app.get('/api/searchOne/:offerId/:model', async (req, res) => {
        //const model = req.body.model.toLowerCase();

        const dbCollection = await mongoose.model(req.params.model)
            .findOne({_id: req.params.offerId}).then(existingOffer => {
                res.send(existingOffer);
            });
    });
    app.get('/api/search/:searchText/:searchLimit', async (req, res) => {
        const dhFramesResult = await bm_dhframe.dhFramesSearch(req.params.searchText, parseInt(req.params.searchLimit));
        let searchResults = [];
        for (let i = 0 ; i < dhFramesResult.length; i++){
            let searchItem = {
                title: dhFramesResult[i].title,
                bmartId: dhFramesResult[i].bmartId,
                publishDate: dhFramesResult[i].publishDate,
                category: 'DHFrames',
                pictures: dhFramesResult[i].pictures,
                description: dhFramesResult[i].description,
                watchedTimes: dhFramesResult[i].watchedTimes,
                productUrl: dhFramesResult[i].productUrl,
                price: dhFramesResult[i].price,
                favorite: dhFramesResult[i].favorite,
                _id: dhFramesResult[i]._id,
            }
            searchResults.push(searchItem);
        }
        const enduroFramesResult = await bm_enduroframe.enduroFramesSearch(req.params.searchText, parseInt(req.params.searchLimit));
        for (let i = 0 ; i < enduroFramesResult.length; i++){
            let searchItem = {
                title: enduroFramesResult[i].title,
                bmartId: enduroFramesResult[i].bmartId,
                publishDate: enduroFramesResult[i].publishDate,
                category: 'EnduroFrames',
                pictures: enduroFramesResult[i].pictures,
                description: enduroFramesResult[i].description,
                watchedTimes: enduroFramesResult[i].watchedTimes,
                productUrl: enduroFramesResult[i].productUrl,
                price: enduroFramesResult[i].price,
                favorite: enduroFramesResult[i].favorite,
                _id: enduroFramesResult[i]._id,
            }
            searchResults.push(searchItem);
        }
        const hubsResult = await bm_hub.hubsSearch(req.params.searchText, parseInt(req.params.searchLimit));
        for (let i = 0 ; i < hubsResult.length; i++){
            let searchItem = {
                title: hubsResult[i].title,
                bmartId: hubsResult[i].bmartId,
                publishDate: hubsResult[i].publishDate,
                category: 'Hubs',
                pictures: hubsResult[i].pictures,
                description: hubsResult[i].description,
                watchedTimes: hubsResult[i].watchedTimes,
                productUrl: hubsResult[i].productUrl,
                price: hubsResult[i].price,
                favorite: hubsResult[i].favorite,
                _id: hubsResult[i]._id,
            }
            searchResults.push(searchItem);
        }
        const wheelsResult = await bm_wheel.wheelsSearch(req.params.searchText, parseInt(req.params.searchLimit));
        for (let i = 0 ; i < wheelsResult.length; i++){
            let searchItem = {
                title: wheelsResult[i].title,
                bmartId: wheelsResult[i].bmartId,
                publishDate: wheelsResult[i].publishDate,
                category: 'Wheels',
                pictures: wheelsResult[i].pictures,
                description: wheelsResult[i].description,
                watchedTimes: wheelsResult[i].watchedTimes,
                productUrl: wheelsResult[i].productUrl,
                price: wheelsResult[i].price,
                favorite: wheelsResult[i].favorite,
                _id: wheelsResult[i]._id,
            }
            searchResults.push(searchItem);
        }
        const cranksResult = await bm_crank.cranksSearch(req.params.searchText, parseInt(req.params.searchLimit));
        for (let i = 0 ; i < cranksResult.length; i++){
            let searchItem = {
                title: cranksResult[i].title,
                bmartId: cranksResult[i].bmartId,
                publishDate: cranksResult[i].publishDate,
                category: 'Cranks',
                pictures: cranksResult[i].pictures,
                description: cranksResult[i].description,
                watchedTimes: cranksResult[i].watchedTimes,
                productUrl: cranksResult[i].productUrl,
                price: cranksResult[i].price,
                favorite: cranksResult[i].favorite,
                _id: cranksResult[i]._id,
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
    app.get('/api/bm/category/:model/:skipRange/:pageLimit/:favFilter/:withoutTagsFilter',
        async (req, res) => {
            const strFavorite = req.params.favFilter.replace(/\s/g,'');
            const strWithoutTags = req.params.withoutTagsFilter.replace(/\s/g,'');
            let favFilter = (strFavorite === `true`);
            let withoutTagsFilter = (strWithoutTags === `true`);
            // let firstPage = (req.params.showFirst === `true`);
            // let lastPage = (req.params.showLast === `true`);
            console.log(`favorite  filter: ${favFilter} paramString: ${strFavorite}`);
            console.log(`withoutTags filter: ${withoutTagsFilter} paramString: ${strWithoutTags}`);
            // console.log(`firstPage : ${firstPage}`);
            // console.log(`lastPage : ${lastPage}`);
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
            dbCollection = mongoose.model(req.params.model);
            dbCollection.find(filters).count(async (err, count) => {
                counter = count;
                const currentModel = await dbCollection
                    .find(filters)
                    .sort({'bmartId': -1})
                    .skip(skipRange)
                    .limit(pageLimit)
                    .select({ __v: false });
                const objSearch = {result: currentModel, count: counter};
                res.send(objSearch);   
            });
        }
    );
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
        if (pageLimit !== 0){ 
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
        }
    });
    //>>bestoffer
    //==================================================================================================================
    //<<enduroframes
    app.get('/api/bm/category/enduroframes', (req, res) => {
        mongoose.model('enduroframes').count(function(err, enduroframes) {
            res.send({ enduroframes });
        });
    });
    //>>enduroframes
    //==================================================================================================================
    //<<hubs
    app.get('/api/bm/category/hubs', (req, res) => {
        mongoose.model('hubs').count(function(err, hubs) {
            res.send({hubs});
        });
    });
    //>>hubs
    //==================================================================================================================
    //<<wheels
    app.get('/api/bm/category/wheels', (req, res) => {
        mongoose.model('wheels').count(function(err, wheels) {
            res.send({ wheels });
        });
    });
    //>>wheels
};
