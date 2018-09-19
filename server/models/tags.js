const mongoose = require('mongoose');
const {Schema} = mongoose;

const TagSchema = new Schema({
    bmartId: String,
    olxId: String,
    name: String,
    count: Number,
    active: Boolean,
    ignore: Boolean
});
//#create mongo model (table) - two arguments [name, schema]
mongoose.model('tags', TagSchema);
//# create record
const Tag = mongoose.model('tags');
exports.create = (data, atributes) => {
    new Tag({
        bmartId: data.bm_id,
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
exports.update = (Tag, id, data, atributes) => {
    Tag.findById(id, (err, tag) => {
        tag.name = data.item.trim();
        tag.count = 2;
        tag.active = data.publishDate.trim();
        tag.ignore = data.productUrl;
        crank.save().then(() => {
            console.log('[][][] updating Tag...');
        });
    });
};
//# update colums
exports.updateFavorite = (id, markAs) => {
    Crank.findById(id, (err, crank) => {
        crank.favorite = markAs;
        crank.save().then(() => {
            console.log('[][][] favorizing Crank...');
        });
    });    
};