const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mozesz tez uzyc ES5 (aka ECMAScript 2015)
// {Schema} = mongoose;
const translate = require('../config/translations_bmarkt.js');

const EnduroframesSchema = new Schema({
    bmartId: String,
    title: String,
    seller: String,
    publishDate: String,
    productUrl: String,
    price: String,
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
mongoose.model('enduroframes', EnduroframesSchema);
//# create record
const EnduroFrame = mongoose.model('enduroframes');
exports.create = (data, atributes) => {
    new EnduroFrame({
        bmartId: data.bm_id,
        title: data.item.trim(),
        seller: data.seller.trim(),
        publishDate: data.publishDate.trim(),
        productUrl: data.productUrl,
        price: data.price.trim(),
        //# inner atributes /specificAtributes
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
            console.log('[*][*][*] creating enduro Frame...');
        });
};
//# update record
exports.update = (EnduroFrame, id, data, atributes) => {
    EnduroFrame.findById(id, (err, enduroFrame) => {
        enduroFrame.title = data.item.trim();
        enduroFrame.seller = data.seller.trim();
        enduroFrame.publishDate = data.publishDate.trim();
        enduroFrame.productUrl = data.productUrl;
        enduroFrame.price = data.price.trim();
        //# inner atributes /specificAtributes
        enduroFrame.description = translate.matchField(atributes, 'description');
        enduroFrame.watchedTimes = translate.matchField(atributes, 'watchedTimes');
        enduroFrame.manufacturer = translate.matchField(atributes, 'manufacturer');
        enduroFrame.state = translate.matchField(atributes, 'state');
        enduroFrame.town = translate.matchField(atributes, 'town');
        enduroFrame.country = translate.matchField(atributes, 'country');
        enduroFrame.color = translate.matchField(atributes, 'color');
        enduroFrame.dealer = translate.matchField(atributes, 'dealer');
        enduroFrame.weight = translate.matchField(atributes, 'weight');
        enduroFrame.frameSize = translate.matchField(atributes, 'frameSize');
        enduroFrame.rearShockDimension = translate.matchField(atributes, 'rearShockDimension');
        enduroFrame.wheelSize = translate.matchField(atributes, 'wheelSize');
        enduroFrame.seatClampSize = translate.matchField(atributes, 'seatClampSize');
        enduroFrame.material = translate.matchField(atributes, 'material');
        enduroFrame.rearTravel = translate.matchField(atributes, 'rearTravel');
        enduroFrame.pictures = {
            picLink1: translate.matchField(atributes, 'pictures', 0),
            picLink2: translate.matchField(atributes, 'pictures', 1),
            picLink3: translate.matchField(atributes, 'pictures', 2),
            picLink4: translate.matchField(atributes, 'pictures', 3),
            picLink5: translate.matchField(atributes, 'pictures', 4),
            picLink6: translate.matchField(atributes, 'pictures', 5)
        };
        enduroFrame.save().then(() => {
            console.log('[][][] updating Enduro Frame...');
        });
    });
};
//# update colums
exports.updateFavorite = (id, markAs) => {
    EnduroFrame.findById(id, (err, enduroFrame) => {
        enduroFrame.favorite = markAs;
        enduroFrame.save().then(() => {
            console.log('[][][] favorizing EnduroFrame...');
        });
    });    
};