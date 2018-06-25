const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mozesz tez uzyc ES5 (aka ECMAScript 2015)
// {Schema} = mongoose;
const translate = require('../config/translations_bmarkt.js');

const CrankSchema = new Schema({
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
    //////////[specific attributes]//////////
    chainringMountType: String,
    crankStandard: String,
    crankArmLength: String,
    crankWidth: String,
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
mongoose.model('cranks', CrankSchema);
//# create record
const Crank = mongoose.model('cranks');
exports.create = (data, atributes) => {
    new Crank({
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
        chainringMountType: translate.matchField(atributes, 'chainringMountType'),
        crankStandard: translate.matchField(atributes, 'crankStandard'),
        crankArmLength: translate.matchField(atributes, 'crankArmLength'),
        crankWidth: translate.matchField(atributes, 'crankWidth'),
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
            console.log('[*][*][*] creating Crank...');
        });
};
//# update record
exports.update = (Crank, id, data, atributes) => {
    Crank.findById(id, (err, crank) => {
        crank.title = data.item.trim();
        crank.seller = data.seller.trim();
        crank.publishDate = data.publishDate.trim();
        crank.productUrl = data.productUrl;
        crank.price = data.price.trim();
        //# inner atributes /specificAtributes
        crank.description = translate.matchField(atributes, 'description');
        crank.watchedTimes = translate.matchField(atributes, 'watchedTimes');
        crank.manufacturer = translate.matchField(atributes, 'manufacturer');
        crank.state = translate.matchField(atributes, 'state');
        crank.town = translate.matchField(atributes, 'town');
        crank.country = translate.matchField(atributes, 'country');
        crank.color = translate.matchField(atributes, 'color');
        crank.dealer = translate.matchField(atributes, 'dealer');
        crank.weight = translate.matchField(atributes, 'weight');
        crank.chainringMountType = translate.matchField(atributes, 'chainringMountType');
        crank.crankStandard = translate.matchField(atributes, 'crankStandard');
        crank.crankArmLength = translate.matchField(atributes, 'crankArmLength');
        crank.crankWidth = translate.matchField(atributes, 'crankWidth');
        crank.pictures = {
            picLink1: translate.matchField(atributes, 'pictures', 0),
            picLink2: translate.matchField(atributes, 'pictures', 1),
            picLink3: translate.matchField(atributes, 'pictures', 2),
            picLink4: translate.matchField(atributes, 'pictures', 3),
            picLink5: translate.matchField(atributes, 'pictures', 4),
            picLink6: translate.matchField(atributes, 'pictures', 5)
        };
        crank.save().then(() => {
            console.log('[][][] updating Crank...');
        });
    });
};
