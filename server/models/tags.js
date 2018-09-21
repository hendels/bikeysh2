const mongoose = require('mongoose');
const {Schema} = mongoose;

const TagSchema = new Schema({
    offerId: String,
    offerOrigin: String,
    name: String,
    count: Number,
    active: Boolean,
    ignore: Boolean,
    manufacturerTag: String,
    groupTag: String,
    modelTag: String,
    preciseName: String,
    surePercent: Number,
    category: String,
    price: Number,
    currency: String,
    year: Number
});
//#create mongo model (table) - two arguments [name, schema]
mongoose.model('tags', TagSchema);
//# create record
const Tag = mongoose.model('tags');
exports.create = (data) => {
    new Tag({
        offerId: data.offerId,
        offerOrigin: data.offerOrigin,
        name: data.name.trim(),
        count: 1,
        active: true,
        ignore: false
    })
        .save()
        .then(() => {
            console.log('[*][*][*] creating Tag...');
        });
};
//# update record
exports.update = (Tag, id, data) => {
    Tag.findById(id, (err, tag) => {
        tag.name = data.name.trim();
        tag.count = 2;
        tag.active = data.active;
        tag.ignore = data.ignore;
        tag.save().then(() => {
            console.log('[][][] updating Tag...');
        });
    });
};
//# update colums
exports.updateFavorite = (id, markAs) => {
    Tag.findById(id, (err, tag) => {
        tag.favorite = markAs;
        tag.save().then(() => {
            console.log('[][][] favorizing Crank...');
        });
    });    
};