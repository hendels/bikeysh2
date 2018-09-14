const urls = require('./config/urls.js');
const scraper = require('./bikemarkt/list.js');
const config = require('./config/config.js');
const getCategories = require('./config/categories_bmarkt.js');

var pages = config.pageSearchCount;
var categoryLinks;
var categoryDesc;
getCategories.categoryArray(pages, links => {
    categoryLinks = links.categoryLinks;
    categoryDesc = links.categoryDesc;
});

for (var iLink = 0; iLink < categoryLinks.length; iLink++) {
    var url = categoryLinks[iLink];
    var getCategory = categoryDesc[iLink];
    console.log('crawling category: ' + getCategory + '...');
    var input = {
        iUrl: url,
        iCategory: getCategory
    };
    scraper
        .bmList(input)
        .then(data => {
            //for (var i = 0; i < data.length; i++) {
            //console.log(data.bm_id);
            //console.log("save");
            //}
        })
        .catch(error => {
            console.log('error scraping data' + error);
        });
}
