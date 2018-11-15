const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mozesz tez uzyc ES5 (aka ECMAScript 2015)
// {Schema} = mongoose;
const translate = require('../config/translations_bmarkt.js');

const WheelsSchema = new Schema({
    bmartId: String,
    title: String,
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
    rimWidth: String,
    axleDiameterFrontWheel: String,
    axleDiameterRearWheel: String,
    axleType: String,
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
mongoose.model('wheels', WheelsSchema);
//# create record
const Wheel = mongoose.model('wheels');
exports.create = (data, atributes) => {
    new Wheel({
        bmartId: data.bm_id,
        title: data.item.trim(),
        seller: data.seller.trim(),
        publishDate: data.publishDate.trim(),
        productUrl: data.productUrl,
        price: data.price.trim(),
        tagCount: 0,
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
        rimWidth: translate.matchField(atributes, 'rimWidth'),
        axleDiameterFrontWheel: translate.matchField(atributes, 'axleDiameterFrontWheel'),
        axleDiameterRearWheel: translate.matchField(atributes, 'axleDiameterRearWheel'),
        axleType: translate.matchField(atributes, 'axleType'),
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
            console.log('[*][*][*] creating Wheel...');
        });
};
//# update record
exports.update = (Wheel, id, data, atributes) => {
    Wheel.findById(id, (err, wheel) => {
        wheel.title = data.item.trim();
        wheel.seller = data.seller.trim();
        wheel.publishDate = data.publishDate.trim();
        wheel.productUrl = data.productUrl;
        wheel.price = data.price.trim();
        //# inner atributes /specificAtributes
        wheel.description = translate.matchField(atributes, 'description');
        wheel.watchedTimes = translate.matchField(atributes, 'watchedTimes');
        wheel.manufacturer = translate.matchField(atributes, 'manufacturer');
        wheel.state = translate.matchField(atributes, 'state');
        wheel.town = translate.matchField(atributes, 'town');
        wheel.country = translate.matchField(atributes, 'country');
        wheel.color = translate.matchField(atributes, 'color');
        wheel.dealer = translate.matchField(atributes, 'dealer');
        wheel.weight = translate.matchField(atributes, 'weight');
        wheel.rimWidth = translate.matchField(atributes, 'rimWidth');
        wheel.axleDiameterFrontWheel = translate.matchField(atributes, 'axleDiameterFrontWheel');
        wheel.axleDiameterRearWheel = translate.matchField(atributes, 'axleDiameterRearWheel');
        wheel.axleType = translate.matchField(atributes, 'axleType');
        wheel.pictures = {
            picLink1: translate.matchField(atributes, 'pictures', 0),
            picLink2: translate.matchField(atributes, 'pictures', 1),
            picLink3: translate.matchField(atributes, 'pictures', 2),
            picLink4: translate.matchField(atributes, 'pictures', 3),
            picLink5: translate.matchField(atributes, 'pictures', 4),
            picLink6: translate.matchField(atributes, 'pictures', 5)
        };
        wheel.save().then(() => {
            console.log('[][][] updating wheel...');
        });
    });
};
//# update colums
exports.updateFavorite = (id, markAs) => {
    Wheel.findById(id, (err, wheel) => {
        wheel.favorite = markAs;
        wheel.save().then(() => {
            console.log('[][][] favorizing Wheel...');
        });
    });    
};