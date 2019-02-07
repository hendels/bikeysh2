const cheerio = require('cheerio');
const request = require('request');
const urls = require('../config/urls.js');
var fs = require('fs');

const details_html = '';

exports.offerDetails = input => {
    return new Promise((resolve, reject) => {
        //create url
        itemUrl = input.productUrl;
        request(itemUrl, function(err, response, html) {
            if (err) {
                reject(err);
            }
            var $ = cheerio.load(html);
            //# initialize table
            var partArtibutes = [];
            //# extract data from itemUrl
            //## articleDescription
            $('.articleDescription')
                .find('br')
                .map((i, elem) => {
                    $(this).replaceWith('\n');
                });
            const description = $('.articleDescription')
                .text()
                .trim();
            input.description = description;

            var objDesc = {
                labels: 'Description',
                values: description
            };
            partArtibutes.push(objDesc);
            //## pictures
            var testPics = $('div[class=articleGallery]').map(function(i, elem) {
                var picArray = [];
                for (var iPic = 0; iPic < 6; iPic++) {
                    var pics = $(this)
                        .children()
                        .eq(iPic);
                    var productUrl = pics.find('a').attr('href');
                    if (productUrl !== undefined) {
                        picArray.push(productUrl);
                    }
                }
                var objPics = {
                    labels: 'Pictures',
                    values: picArray
                };
                partArtibutes.push(objPics);
            });
            //## specific attribute items
            var getAtributes = $('div[class=item]').map(function(i, elem) {
                var values = $(this)
                    .children()
                    .eq(1)
                    .text();
                var labels = $(this)
                    .children()
                    .eq(0)
                    .text();
                var obj = {
                    labels: labels,
                    values: values
                };
                partArtibutes.push(obj);
            });
            //# set output from previous scraped & gathered in details data
            input.attributeArray = partArtibutes;
            var output = input;
            setTimeout(() => {
                resolve(output);
            }, 50);
        });
    });
};
