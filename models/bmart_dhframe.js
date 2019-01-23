const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const translate = require('../config/translations_bmarkt.js');

const DhframesSchema = new Schema({
    bmartId: String,
    title: {type: String, text: true},
    seller: String,
    publishDate: String,
    productUrl: String,
    price: String,
    tagCount: Number,
    //////////[inner attributes]//////////
    description: String,
    watchedTimes: Number,
    manufacturer: String,
    state: String,
    shippingCost: Number,
    town: String,
    country: String,
    color: String,
    viewed: Number,
    dealer: String,
    weight: String,
    
    //////////[app attributes]//////////
    favorite: Boolean,
    //////////[specific attributes]//////////
    frameSize: String,
    rearShockDimension: String,
    wheelSize: String,
    seatClampSize: String,
    material: String,
    rearTravel: String,
    pictures: {
        picLink1: String,
        picLink2: String,
        picLink3: String,
        picLink4: String,
        picLink5: String,
        picLink6: String
    }
});
//#create mongo model (table) - two arguments [name, schema]
mongoose.model('dhframes', DhframesSchema);
//# create record
const DhFrame = mongoose.model('dhframes');
exports.create = (data, atributes) => {
    new DhFrame({
        bmartId: data.bm_id,
        title: data.item.trim(),
        seller: data.seller.trim(),
        publishDate: data.publishDate.trim(),
        productUrl: data.productUrl,
        price: data.price.trim(),
        tagCount: 0,
        //# inner atributes
        description: translate.matchField(atributes, 'description'),
        watchedTimes: translate.matchField(atributes, 'watchedTimes'),
        manufacturer: translate.matchField(atributes, 'manufacturer'),
        state: translate.matchField(atributes, 'state'),
        town: translate.matchField(atributes, 'town'),
        country: translate.matchField(atributes, 'country'),
        color: translate.matchField(atributes, 'color'),
        dealer: translate.matchField(atributes, 'dealer'),
        weight: translate.matchField(atributes, 'weight'),
        //////////[app attributes]//////////
        favorite: false,
        //////////[specificAtributes]///////
        frameSize: translate.matchField(atributes, 'frameSize'),
        rearShockDimension: translate.matchField(atributes, 'rearShockDimension'),
        wheelSize: translate.matchField(atributes, 'wheelSize'),
        seatClampSize: translate.matchField(atributes, 'seatClampSize'),
        material: translate.matchField(atributes, 'material'),
        rearTravel: translate.matchField(atributes, 'rearTravel'),
        pictures: {
            picLink1: translate.matchField(atributes, 'pictures', 0),
            picLink2: translate.matchField(atributes, 'pictures', 1),
            picLink3: translate.matchField(atributes, 'pictures', 2),
            picLink4: translate.matchField(atributes, 'pictures', 3),
            picLink5: translate.matchField(atributes, 'pictures', 4),
            picLink6: translate.matchField(atributes, 'pictures', 5)
        }
    })
        .save()
        .then(() => {
            console.log('[*][*][*] creating DhFrame...');
        });
};
//# update record
exports.update = (DhFrame, id, data, atributes) => {
    DhFrame.findById(id, (err, dhFrame) => {
        dhFrame.title = data.item.trim();
        dhFrame.seller = data.seller.trim();
        dhFrame.publishDate = data.publishDate.trim();
        dhFrame.productUrl = data.productUrl;
        dhFrame.price = data.price.trim();
        //# inner atributes 
        dhFrame.description = translate.matchField(atributes, 'description');
        dhFrame.watchedTimes = translate.matchField(atributes, 'watchedTimes');
        dhFrame.manufacturer = translate.matchField(atributes, 'manufacturer');
        dhFrame.state = translate.matchField(atributes, 'state');
        dhFrame.town = translate.matchField(atributes, 'town');
        dhFrame.country = translate.matchField(atributes, 'country');
        dhFrame.color = translate.matchField(atributes, 'color');
        dhFrame.dealer = translate.matchField(atributes, 'dealer');
        dhFrame.weight = translate.matchField(atributes, 'weight');

        //////////[specific attributes]//////////
        dhFrame.frameSize = translate.matchField(atributes, 'frameSize');
        dhFrame.rearShockDimension = translate.matchField(atributes, 'rearShockDimension');
        dhFrame.wheelSize = translate.matchField(atributes, 'wheelSize');
        dhFrame.seatClampSize = translate.matchField(atributes, 'seatClampSize');
        dhFrame.material = translate.matchField(atributes, 'material');
        dhFrame.rearTravel = translate.matchField(atributes, 'rearTravel');
        dhFrame.pictures = {
            picLink1: translate.matchField(atributes, 'pictures', 0),
            picLink2: translate.matchField(atributes, 'pictures', 1),
            picLink3: translate.matchField(atributes, 'pictures', 2),
            picLink4: translate.matchField(atributes, 'pictures', 3),
            picLink5: translate.matchField(atributes, 'pictures', 4),
            picLink6: translate.matchField(atributes, 'pictures', 5)
        };
        dhFrame.save().then(() => {
            console.log('[][][] updating dhFrame...');
        });
    });
};
//# update colums
exports.updateFavorite = (id, markAs) => {
    DhFrame.findById(id, (err, dhframe) => {
        dhframe.favorite = markAs;
        dhframe.save().then(() => {
            console.log('[][][] favorizing Dh Frame...');
        });
    });    
};
exports.createTextIndexDHFrames = () => {
    DhframesSchema.index( { title: 'text'} );
    //DhframesSchema.index( { '$**': 'text'} );
};
exports.dhFramesSearch = async (searchQuery, limit) => {
    let result = null;
    //search window results
    if (limit > 0)
        result = await DhFrame.find({ $text: { $search: searchQuery}}).limit(limit);
    //full results
    if (limit === 0)
        result = await DhFrame.find({ $text: { $search: searchQuery}});
        
    return result;
};