const urls = require('./urls');

var categoryList = [
    {
        linkCategory: '44-naben',
        category: 'hubs'
    },
    {
        linkCategory: '43-laufrader',
        category: 'wheels'
    },
    {
        linkCategory: '21-allmountain-enduro',
        category: 'frames-enduro'
    },
    {
        linkCategory: '22-freeride-downhill',
        category: 'frames-downhill'
    },
    {
        linkCategory: '52-kurbeln',
        category: 'cranksets'
    }
];

var categoryLinks = [];
var categoryDesc = [];

exports.categoryArray = (pages, links) => {
    createArrayOfLinks(pages, categoryLinks, categoryDesc);
    links({
        categoryLinks: categoryLinks,
        categoryDesc: categoryDesc
    });
};

function createArrayOfLinks(pages, categoryLinks, categoryDesc) {
    for (var i = 0; i < categoryList.length; i++) {
        for (var pageId = 1; pageId <= pages; pageId++) {
            var obj = categoryList[i];
            var composedLink = urls.categoryUrl + obj.linkCategory + '?page=' + pageId;
            categoryLinks.push(composedLink);
            categoryDesc.push(obj.category);
        }
    }
}
