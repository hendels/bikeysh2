const mongoose = require('mongoose');
const {Schema} = mongoose;

const ScoringSchema = new Schema({
    offerId: String,
    offerOrigin: String,
    fullName: String,
    category: String,
    manufacturerSetId: Number,
    modelSetId: Number,
    groupSetId: Number,
    surePercent: Number,
    category: String,
    price: String,
    currency: String,
    year: Number
});
//#create mongo model (table) - two arguments [name, schema]
mongoose.model('scoring', ScoringSchema);
const Scoring = mongoose.model('scoring', ScoringSchema);

exports.create = async (data) => {
    await new Scoring({
        offerId: data.offerId,
        offerOrigin: data.offerOrigin,
        fullName: "full name dummy",
        category: data.category,
        manufacturerSetId: data.manufacturerSetId,
        modelSetId: data.modelSetId,
        groupSetId: 0,
        price: data.price,
    })
    .save()
    .then(() => {
        console.log(`[*][*][*] creating Scoring [Manufacturer pair : ${data.manufacturerSetId} / Model pair : ${data.modelSetId} 
            offer: ${data.offerId}]...`);
    });
};