const mongoose = require('mongoose');
const {Schema} = mongoose;

const ScoringSchema = new Schema({
    offerId: String,
    offerOrigin: String,
    fullName: String,
    scores: Number,
    grade: String,
    category: String,
    manufacturerSetId: Number,
    modelSetId: Number,
    groupSetId: Number,
    surePercent: Number,
    category: String,
    price: Number,
    currency: String,
    yearTitle: Number,
    yearDescription: Number,
    countTotal: Number,
    median: Number
});
//#create mongo model (table) - two arguments [name, schema]
mongoose.model('scoring', ScoringSchema);
const Scoring = mongoose.model('scoring', ScoringSchema);

exports.create = async (data) => {
    await new Scoring({
        offerId: data.offerId,
        offerOrigin: data.offerOrigin,
        fullName: data.fullName,
        category: data.category,
        manufacturerSetId: data.manufacturerSetId,
        modelSetId: data.modelSetId,
        groupSetId: 0,
        price: data.price,
        currency: data.currency,
        yearTitle: data.yearTitle,
        yearDescription: data.yearDescription
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
        scoring.save().then(() => {
            console.log(`[][][] update scores for Offer... ${id} scores: ${scores}`);
        });
    });    
};