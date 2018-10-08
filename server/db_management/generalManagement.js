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