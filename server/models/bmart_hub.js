const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mozesz tez uzyc ES5 (aka ECMAScript 2015)
// {Schema} = mongoose;
const translate = require('../config/translations_bmarkt.js');

const HubsSchema = new Schema({
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
    frontSpokesNo: Number,
    rearSpokesNo: Number,
    frontAxle: String,
    rearAxle: String,
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
mongoose.model('hubs', HubsSchema);

//# create record
const Hub = mongoose.model('hubs');
exports.create = (data, atributes) => {
    new Hub({
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
        frontSpokesNo: translate.matchField(atributes, 'frontSpokesNo'),
        rearSpokesNo: translate.matchField(atributes, 'rearSpokesNo'),
        frontAxle: translate.matchField(atributes, 'frontAxle'),
        rearAxle: translate.matchField(atributes, 'rearAxle'),
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
            console.log('[*][*][*] creating Hub...');
        });
};
//# update record
exports.update = (Hub, id, data, atributes) => {
    Hub.findById(id, (err, hub) => {
        hub.title = data.item.trim();
        hub.seller = data.seller.trim();
        hub.publishDate = data.publishDate.trim();
        hub.productUrl = data.productUrl;
        hub.price = data.price.trim();
        //# inner atributes /specificAtributes
        hub.description = translate.matchField(atributes, 'description');
        hub.watchedTimes = translate.matchField(atributes, 'watchedTimes');
        hub.manufacturer = translate.matchField(atributes, 'manufacturer');
        hub.state = translate.matchField(atributes, 'state');
        hub.town = translate.matchField(atributes, 'town');
        hub.country = translate.matchField(atributes, 'country');
        hub.color = translate.matchField(atributes, 'color');
        hub.dealer = translate.matchField(atributes, 'dealer');
        hub.weight = translate.matchField(atributes, 'weight');
        hub.frontSpokesNo = translate.matchField(atributes, 'frontSpokesNo');
        hub.rearSpokesNo = translate.matchField(atributes, 'rearSpokesNo');
        hub.frontAxle = translate.matchField(atributes, 'frontAxle');
        hub.rearAxle = translate.matchField(atributes, 'rearAxle');
        hub.pictures = {
            picLink1: translate.matchField(atributes, 'pictures', 0),
            picLink2: translate.matchField(atributes, 'pictures', 1),
            picLink3: translate.matchField(atributes, 'pictures', 2),
            picLink4: translate.matchField(atributes, 'pictures', 3),
            picLink5: translate.matchField(atributes, 'pictures', 4),
            picLink6: translate.matchField(atributes, 'pictures', 5)
        };
        hub.save().then(() => {
            console.log('[][][] updating hub...');
        });
    });
};
//# update colums
exports.updateFavorite = (id, markAs) => {
    Hub.findById(id, (err, hub) => {
        hub.favorite = markAs;
        hub.save().then(() => {
            console.log('[][][] favorizing Hub...');
        });
    });    
};