const mongoose = require('mongoose');
const {Schema} = mongoose;

const ScoringSchema = new Schema({
    offerId: String,
    offerOrigin: String,
    showOffer: Boolean,
    fullName: String,
    scores: Number,
    grade: String,
    category: String,
    itemState: String,
    stateCategory: Number,
    manufacturerSetId: Number,
    modelSetId: Number,
    groupSetId: Number,
    category: String,
    price: Number,
    currency: String,
    yearTitle: Number,
    yearDescription: Number,
    countTotal: Number,
    median: Number,
    urlActive: Boolean,

});
//#create mongo model (table) - two arguments [name, schema]
mongoose.model('scoring', ScoringSchema);
const Scoring = mongoose.model('scoring', ScoringSchema);

exports.create = async (data) => {
    await new Scoring({
        offerId: data.offerId,
        offerOrigin: data.offerOrigin,
        showOffer: true,
        fullName: data.fullName,
        category: data.category,
        manufacturerSetId: data.manufacturerSetId,
        modelSetId: data.modelSetId,
        groupSetId: 0,
        price: data.price,
        currency: data.currency,
        yearTitle: data.yearTitle,
        yearDescription: data.yearDescription,
        itemState: data.itemState,
        stateCategory: data.stateCategory,
        urlActive: true
    })
    .save()
    .then(() => {
        // console.log(`[*][*][*] creating Scoring [Manufacturer pair : ${data.manufacturerSetId} / Model pair : ${data.modelSetId} 
        //     offer: ${data.offerId}]...`);
    });
};
exports.updateScores = async (id, data) => {
    await Scoring.findById(id, (err, scoring) => {
        scoring.scores = data.scores;
        scoring.countTotal = data.countTotal;
        scoring.median = data.median;
        scoring.urlActive = data.urlActive;
        scoring.save().then(() => {
            console.log(`[][][] update scores for Offer[scoring]... ${id} scores: ${data.scores}`);
        });
    });    
};
exports.updateVisibility = async (id, visible) => {
    await Scoring.findById(id, (err, scoring) => {
        // scoring.showOffer === null ? scoring.showOffer = false : null;
        const currentStatus = scoring.showOffer;
        scoring.showOffer = !currentStatus;
        scoring.save().then(() => {
            console.log(`[][][] setting visibility for Offer[scoring]... ${id} visibility: ${scoring.showOffer}`);
            visible(scoring.showOffer);
        });
    });    
};