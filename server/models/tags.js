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
exports.update = (Tag, id, data) => {
    Tag.findById(id, (err, tag) => {
        tag.tagName = data.tagName.trim();
        tag.count = 2;
        tag.active = data.active;
        tag.ignore = data.ignore;
        tag.save().then(() => {
            console.log('[][][] updating Tag...');
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
// exports.updateGroup = (id, tagName) => {
//     Tag.findById(id, (err, tag) => {
//         tag.manufacturerTag === tagName ? tag.manufacturerTag = "" : null;
//         tag.groupTag = tagName;
//         tag.modelTag === tagName ? tag.modelTag = "" : null;
//         tag.save().then(() => {
//             console.log('[][][] tag group update..');
//         });
//     });    
// };
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