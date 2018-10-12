const mongoose = require('mongoose');

exports.updateFavorite = (id, model, favorite) => {
    const Model = mongoose.model(model);
    Model.findById(id, (err, record) => {

        record.favorite = !record.favorite;
        record.save().then(() => {
            // console.log(`[][][] favorizing ${Model} to: ${record.favorite}...`);
            favorite(record.favorite);
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
// exports.unhideSpecificScoring = async (offerId) => {
//     const Scoring = await mongoose.model('scoring').find({offerId: offerId}).select({ __v: false });
//     Scoring.map(score => {
//         score.showOffer = true;
//         score.save().then(()=>{
//             console.log(`${score.offerId} changed to visible.`)
//         });
//     });

// };