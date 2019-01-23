const mongoose = require('mongoose');
const {Schema} = mongoose;

const TagSchema = new Schema({
    offerId: String,
    offerOrigin: String,
    tagName: String,
    count: Number,
    active: Boolean,
    tagPairNo: Number,
    ignoreTag: String,
    helperTag: String,
    manufacturerTag: String,
    manufacturerTagPair: Number,
    groupTag: String,
    groupTagPair: Number,
    modelTag: String,
    modelTagPair: Number,
    preciseName: String,
    surePercent: Number,
    category: String,
    price: String,
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
        category: data.category,
        manufacturerTag: data.manufacturerTag,
        modelTag: data.modelTag,
        groupTag: data.groupTag,
        count: 0,
        price: data.price
    })
    .save()
    .then(() => {
        console.log(`[*][*][*] creating Tag [${data.tagName} offer: ${data.offerId}]...`);
    });
};
//# update record
exports.updateTagSet = async (id, tagName, updateCase, tagPairNo) => {
    await Tag.findById(id, (err, tag) => {
        // console.log('========================[update]===============================');
        eraseTags(tag);
        switch(updateCase){
            case `Manufacturer`:
                tag.manufacturerTag = tagName;
                tag.manufacturerTagPair = tagPairNo;
                break;
            case `Group`:
                tag.groupTag = tagName;
                tag.groupTagPair = tagPairNo;
                break;
            case `Model`:
                tag.modelTag = tagName;
                tag.modelTagPair = tagPairNo;
                break;
            case `Ignored tags`:
                tag.ignoreTag = tagName;
                break;
            case `Helpers`:
                tag.helperTag = tagName;
                break;
            default:
                break;
        }
        tag.save().then(() => {
            console.log(`[][][] updating in smart way Tag...[${updateCase} / tagName: ${tagName}`);
        });
    });
};
exports.deleteTag = async (_id, offerId, tagName) => {
    await Tag.deleteOne({offerId: offerId, tagName: tagName}, (err) => {
        if (err) return 'error while deleting tags';
        console.log(`tag ${tagName} deleted.`)
    })
}
//# job functions

//# update colums

//# functions
const eraseTags = (obj) => {

    if (obj.manufacturerTag !== ``) {
        obj.manufacturerTag = ``;
        obj.manufacturerTagPair = 0;
    }
    if (obj.modelTag !== ``){
        obj.modelTag = ``;
        obj.modelTagPair = 0;
    }
    if (obj.groupTag !== ``) {
        obj.groupTag = ``;
        obj.groupTagPair = 0;
    }
    if (obj.ignoreTag !== ``) obj.ignoreTag = ``;
    if (obj.helperTag !== ``) obj.helperTag = ``;

    return obj;
  }