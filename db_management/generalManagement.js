const mongoose = require('mongoose');

exports.updateFavorite = (id, model, favorite) => {
    const Model = mongoose.model(model);
    Model.findById(id, (err, record) => {

        record.favorite = !record.favorite;
        record.save().then(() => {
            favorite(record.favorite);
        });
    });    
};
exports.updateTagCounter = async (id, model, tagCounter) => {
    const Model = mongoose.model(model);
    Model.findById(id, (err, record) => {

        record.tagCount = tagCounter;
        record.save().then(() => {
            console.log(`updated ${model} with counter tag = ${tagCounter}`);
            //favorite(record.favorite);
        });
    });    
};
exports.clearHidesFromScoringTable = async () => {
    const Scoring = await mongoose.model('scoring').find().select({ __v: false });
    Scoring.map(score => {
        score.showOffer = true;
        score.save().then(()=>{
            console.log(`${score.offerId} changed to visible.`)
        });
    });

};
exports.fillTagCounterInAllModels = async () => {
    let modelList = [`cranks`, `dhframes`, `enduroframes`, `wheels`, `hubs`];
    for (var iModel = 0; iModel < modelList.length; iModel++){
        let model = modelList[iModel];

        const currentModel = await mongoose.model(model).find().select({ __v: false });
        currentModel.map(table => {
            mongoose.model('tags').count({offerId: table._id}, function(err, tags) {
                table.tagCount = tags;
                table.save().then(()=>{
                    console.log(`setting offer ${table.bmartId} in model ${model} = ${table.tagCount}`);
                });
            });
            
        });
    }

};
exports.findSimilarOffers = async (manufacturerSetId, modelSetId, scoreStats) => {
    
    const Scoring = await mongoose.model('scoring')
        .find({
            manufacturerSetId: manufacturerSetId,
            modelSetId: modelSetId
        })
        .select({ __v: false });

    let avgPrice = 0;
    let currency = ``;
    let median = 0;
    
    const getAllPrices = await Scoring.map(score => {
        avgPrice += score.price;
        currency = score.currency
    });    
    Promise.all(getAllPrices).then(async () => {
        const countOffers = await mongoose.model('scoring').count(
        {
            manufacturerSetId: manufacturerSetId,
            modelSetId: modelSetId
        }, (err, scores) => {
            console.log(`scores = ${scores}`);
        }
        );
        let stats = {
            avgPrice: parseFloat(avgPrice / countOffers).toFixed(0),
            currency: currency,
            countOffers: countOffers,
            median: median
        }
        scoreStats(stats);
        
    });
}