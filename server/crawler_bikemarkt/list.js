//# libs
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
//# app
const details = require('./details.js');

const translate = require('../config/translations_bmarkt.js');
const categorySchema = require('../config/categories_bmarkt.js');

const urls = require('../config/urls.js');
const mongoose = require('mongoose');
const config = require('../config/config.js');
//#get argument from mongodb - from MLAB - one argument [name]
// # Crank category requirements
const Crank = mongoose.model('cranks');
const bm_crank = require('../models/bmart_crank');
// # DhFrame category requirements
const DhFrame = mongoose.model('dhframes');
const bm_dhframe = require('../models/bmart_dhframe');
// # EnduroFrame category requirements
const EnduroFrame = mongoose.model('enduroframes');
const bm_enduroframe = require('../models/bmart_enduroframe');
// # Hub category requirements
const Hub = mongoose.model('hubs');
const bm_hub = require('../models/bmart_hub');
// # Wheel category requirements
const Wheel = mongoose.model('wheels');
const bm_wheel = require('../models/bmart_wheel');

var setLimiter = config.testLimiter;
exports.bmList = input => {
    return new Promise((resolve, reject) => {
        request(input.iUrl, function(err, response, html) {
            if (err) {
                reject(error);
            }
            if (html === undefined) return null;
            var $ = cheerio.load(html);

            var items = [];
            var iCount = 0;
            var allItems = $('.productItem').children();

            allItems.each(function(i, element) {
                if (iCount < setLimiter + 2) {
                    iCount++;
                    var productItem = $(this);

                    var item = productItem
                        .children().eq(0).children().eq(0).text();
                    
                    var seller = productItem
                        .children()
                        .eq(1)
                        .children()
                        .eq(1)
                        .text();
                    var publishDate = productItem
                        .children()
                        .eq(1)
                        .children()
                        .eq(3)
                        .text();
                    var productLink = productItem
                        .children()
                        .eq(0)
                        .children()
                        .eq(0);
                    var productPrice = productItem
                        .children()
                        .eq(1)
                        .children()
                        .eq(4)
                        .text();
                    // console.log('====' + productLink);
                    var productUrl = productLink.find('a').attr('href');
                    var regex = /(\d{6,7})/g;
                    var bm_id = regex.exec(productUrl);
                    if (bm_id !== null) {
                        //console.log(bm_id[0] + " -- " + productPrice);
                        if (productPrice === null || productPrice === undefined) productPrice = 0;
                        //# set metadata from scraping the list#
                        var metadata = {
                            seller: seller,
                            item: item,
                            publishDate: publishDate,
                            productUrl: urls.mainUrl + productUrl,
                            bm_id: bm_id[0],
                            category: input.iCategory,
                            price: productPrice
                        };
                        //# receive data from product link >> get line details#
                        details.offerDetails(metadata).then(data => {
                            console.log(data.bm_id);
                            //# write to file
                            var stream = fs.createWriteStream('./sample2.csv', {
                                flags: 'a'
                            });
                            //# create empty array for attributes
                            var specificAtributes = [];
                            //# loop through attributes & push to array
                            for (var itemAtr = 0; itemAtr < data.attributeArray.length; itemAtr++) {
                                // # translate & prepare array of additional attributes for specific item category
                                translate.translation(data.attributeArray[itemAtr].labels, eng => {
                                    //console.log('translated: ' + eng + ': ' + data.attributeArray[itemAtr].values);
                                    specificAtributes.push({ field: eng, value: data.attributeArray[itemAtr].values });
                                });
                            }
                            switch (data.category) {
                                case 'cranksets':
                                    //# check if bikemarkt ID already exist in [Promise] => Cranks collection
                                    Crank.findOne({ bmartId: data.bm_id }).then(existingId => {
                                        if (existingId) {
                                            //# update record => Crank
                                            bm_crank.update(Crank, existingId.id, data, specificAtributes);
                                        } else {
                                            //# create new collection [.save is async] => Crank
                                            bm_crank.create(data, specificAtributes);
                                        }
                                    });
                                    break;
                                case 'frames-downhill':
                                    //# check if bikemarkt ID already exist in [Promise] => DHFrames collection
                                    DhFrame.findOne({ bmartId: data.bm_id }).then(existingId => {
                                        if (existingId) {
                                            //# update record => DHFrames
                                            bm_dhframe.update(DhFrame, existingId.id, data, specificAtributes);
                                        } else {
                                            //# create new collection [.save is async] => DHFrames
                                            bm_dhframe.create(data, specificAtributes);
                                        }
                                    });
                                    break;
                                case 'frames-enduro':
                                    //# check if bikemarkt ID already exist in [Promise] => Enduro Frame collection
                                    EnduroFrame.findOne({ bmartId: data.bm_id }).then(existingId => {
                                        if (existingId) {
                                            //# update record => Hubs
                                            bm_enduroframe.update(EnduroFrame, existingId.id, data, specificAtributes);
                                        } else {
                                            //# create new collection [.save is async] => Enduro Frame
                                            bm_enduroframe.create(data, specificAtributes);
                                        }
                                    });
                                    break;
                                case 'hubs':
                                    //# check if bikemarkt ID already exist in [Promise] => Hubs collection
                                    Hub.findOne({ bmartId: data.bm_id }).then(existingId => {
                                        if (existingId) {
                                            //# update record => Hubs
                                            bm_hub.update(Hub, existingId.id, data, specificAtributes);
                                        } else {
                                            //# create new collection [.save is async] => Hubs
                                            bm_hub.create(data, specificAtributes);
                                        }
                                    });
                                    break;
                                case 'wheels':
                                    //# check if bikemarkt ID already exist in [Promise] => Wheels collection
                                    Wheel.findOne({ bmartId: data.bm_id }).then(existingId => {
                                        if (existingId) {
                                            //# update record => Wheels
                                            bm_wheel.update(Wheel, existingId.id, data, specificAtributes);
                                        } else {
                                            //# create new collection [.save is async] => Wheel
                                            bm_wheel.create(data, specificAtributes);
                                        }
                                    });
                                    break;
                            }

                            //#write to excel file [testing purpose - checking compability]
                            stream.write(
                                data.category +
                                    ';' +
                                    data.bm_id +
                                    ';' +
                                    data.seller.trim() +
                                    ';' +
                                    data.item.trim() +
                                    ';' +
                                    data.publishDate.trim() +
                                    ';' +
                                    urls.mainUrl +
                                    data.productUrl +
                                    ';' +
                                    data.price.trim() +
                                    '\n'
                            );
                            stream.end();
                            resolve(data);
                        });
                    }
                }
            });
        });
    });
};
