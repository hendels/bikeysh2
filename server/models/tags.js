const mongoose = require('mongoose');
const {Schema} = mongoose;

const TagSchema = new Schema({
    offerId: String,
    offerOrigin: String,
    tagName: String,
    count: Number,
    active: Boolean,
    ignoreTag: String,
    helperTag: String,
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
exports.create = async (data) => {
    await new Tag({
        offerId: data.offerId,
        offerOrigin: data.offerOrigin,
        tagName: data.tagName.trim(),
        count: 1,
    })
    .save()
    .then(() => {
        console.log('[*][*][*] creating Tag...');
    });
};
//# update record
exports.updateTagSet = (id, tagName, updateCase) => {
    Tag.findById(id, (err, tag) => {
        console.log('========================[update]===============================');
        eraseTags(tag);
        switch(updateCase){
            case `Manufacturer`:
                tag.manufacturerTag = tagName;
                break;
            case `Group`:
                tag.groupTag = tagName;
                break;
            case `Model`:
                tag.modelTag = tagName;
                break;
            case `Ignore`:
                tag.ignoreTag = tagName;
                break;
            case `Helpers`:
                tag.helperTag = tagName;
                break;
            default:
                break;
        }
        tag.save().then(() => {
            console.log('[][][] updating in smart way Tag...');
        });
    });
};
//# update colums
exports.updateManufacturer = (id, tagName) => {
    Tag.findById(id, (err, tag) => {
        console.log('========================[update]===============================');
        eraseTags(tag);
        tag.manufacturerTag = tagName;
        tag.save().then(() => {
            console.log('[][][] tag manufacturer update..');
        });
    });    
};
exports.updateGroup = (id, tagName) => {
    Tag.findById(id, (err, tag) => {
        console.log('========================[update]===============================');
        eraseTags(tag);
        tag.groupTag = tagName;
        tag.save().then(() => {
            console.log('[][][] tag group update..');
        });
    });    
};
exports.updateModel = (id, tagName) => {
    Tag.findById(id, (err, tag) => {
        console.log('========================[update]===============================');
        eraseTags(tag);
        tag.modelTag = tagName;

        tag.save().then(() => {
            console.log('[][][] tag model update..');
        });
    });    
};
exports.updateIgnore = (id, tagName) => {
    Tag.findById(id, (err, tag) => {
        console.log('========================[update]===============================');
        eraseTags(tag);
        tag.ignoreTag = tagName;

        tag.save().then(() => {
            console.log('[][][] tag ignore update..');
        });
    });    
};
exports.updateHelpers = (id, tagName) => {
    Tag.findById(id, (err, tag) => {
        console.log('========================[update]===============================');
        eraseTags(tag);
        tag.helperTag = tagName;

        tag.save().then(() => {
            console.log('[][][] tag helper update..');
        });
    });    
};
const eraseTags = (obj) => {

    if (obj.modelTag !== ``) obj.modelTag = ``;
    if (obj.groupTag !== ``) obj.groupTag = ``;
    if (obj.manufacturerTag !== ``) obj.manufacturerTag = ``;
    if (obj.ignoreTag !== ``) obj.ignoreTag = ``;
    if (obj.helperTag !== ``) obj.helperTag = ``;

    return obj;
  }