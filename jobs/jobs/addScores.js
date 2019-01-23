const mongoose = require('mongoose');
const scoring = require('../../models/scoring');
const _ = require('underscore');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const checkUrlAvailability = false;
return new Promise(async (resolve, reject) => {

    let categories = [`cranks`, `dhframes`, `enduroframes`, `wheels`, `hubs`];
    for (var iCategories = 0; iCategories < categories.length; iCategories++){

        const SearchScoringCategory = await mongoose
            .model('scoring')
            .find({category: categories[iCategories]})
            .select();

        //
        const historyMultiplier = [
            {threshold: 0, multiplier: 0.5},
            {threshold: 10, multiplier: 5},
            {threshold: 15, multiplier: 7.5},
            {threshold: 20, multiplier: 9},
            {threshold: 30, multiplier: 10},
            {threshold: 50, multiplier: 11},
            {threshold: 100, multiplier: 12},
            {threshold: 150, multiplier: 13},
            {threshold: 200, multiplier: 14},
            {threshold: 300, multiplier: 15}
        ]
        const additionalScores = {
            price:50,
            yearTitle: 5,
            yearDescription: 2.5,
            regularSeller: 5,
            proffesionalSeller: -10,
            usedItem : 5,
            corruptedItem: 6,
            newItem: -10,
            defected : 5,
            sizeMedium :10,
            sizeLarge : 5,
            sizeSmall: 0,
            sizeXl :-10,

        }
        if(SearchScoringCategory.length !== 0 ){
            // # count all prices 
            let uniqueObjManufacturer = _.uniq(SearchScoringCategory, (item, key, name) => {return item.manufacturerSetId});
            let uniqueObj = _.uniq(SearchScoringCategory, (item, key, name) => {return item.manufacturerSetId && item.modelSetId;});
            // 
            SearchScoringCategory.map(async uniqItem => {
                // console.log(`========category: ${categories[iCategories]} ========`)
                // console.log(`ITEM: ${uniqItem.fullName} manu: ${uniqItem.manufacturerSetId} model: ${uniqItem.modelSetId}`);
                let search = SearchScoringCategory.filter(categoryItem => {if((categoryItem.manufacturerSetId === uniqItem.manufacturerSetId)
                    &&(categoryItem.modelSetId === uniqItem.modelSetId)&&(categoryItem.stateCategory === uniqItem.stateCategory)) return categoryItem});
                if (search){
                    
                    //let multiplier = 
                    let priceTotal = 0;
                    let priceArray = [];
                    for (var i in search) {
                        priceTotal += search[i].price;
                        priceArray.push(search[i].price);
                    };
                    var median = median(priceArray);
                    // console.log(`median: ${median}`);
                    // console.log(`price : ${uniqItem.price} average: ${priceTotal/search.length} count: ${search.length}`);
                    // # count multiplier based on sum of similar offer history
                    let arrThreshold = historyMultiplier.filter(hm => {if((hm.threshold <= search.length)) return hm});
                    let threshold = arrThreshold.slice(-1)[0];
                    // console.log(`multiplier : ${threshold.multiplier}`);
                    // # additional points
                    let addScores = 0;
                    switch(uniqItem.itemState){
                        case `used, like new`:
                            addScores += additionalScores.usedItem;
                            break;
                        case `used`:
                            addScores += additionalScores.usedItem;
                            break;
                        case `brand new`:
                            addScores += additionalScores.newItem;
                            break;
                        case `corrupted`:
                            addScores += additionalScores.corruptedItem;
                            break;
                        default:
                            break;
                    }   
                    // [todo]
                    //<< # if wheel size !== 26 inch, preferable 27,5" / 650b - can be 29"
                    
                    //>>
                    // # check if link is still available => if not count time from checking to insertion
                    //<<
                    let urlActive = true;
                    if (uniqItem.urlActive){
                        if(checkUrlAvailability){
                            const Offer = await mongoose
                            .model(categories[iCategories])
                            .find({_id: uniqItem.offerId})
                            .select({ bmartId: false, __v: false });
                            // console.log(`offer FOUND url ===: ${Offer[0].productUrl}`);
                            
                            var request = new XMLHttpRequest();
                            request.open(`GET`, Offer[0].productUrl, false);
                            request.send();
                            // console.log(`request STATUS ===: ${request.status}`);
                            request.status === 301 || request.status === 404 ? urlActive = false : urlActive = true;
                        }
                    } else 
                        urlActive = false;
                        
                    
                    //>>
                    // # count final scores
                    //<<
                    let scores = ((median / uniqItem.price) * threshold.multiplier) + addScores;
                    console.log(`category: ${categories[iCategories]} url active = ${urlActive} SCORE = ${scores} finished = ${parseInt((SearchScoringCategory.indexOf(uniqItem) / SearchScoringCategory.length )* 100)}%`);
                    var objScores = {
                        scores: scores, 
                        median: median,
                        countTotal: search.length,
                        urlActive: urlActive
                    }
                    //>>
                    await scoring.updateScores(uniqItem._id, objScores);
                    // for (var i in search) {
                    //     let price = search[i].price;

                    // };

                }
                function median(values) {

                    values.sort( function(a,b) {return a - b;} );
                
                    var half = Math.floor(values.length/2);
                
                    if(values.length % 2)
                        return values[half];
                    else
                        return (values[half-1] + values[half]) / 2.0;
                }
                // SearchScoringCategory.map(categoryItem => {
                //     if(categoryItem.manufacturerSetId === uniqItem.manufacturerSetId && 
                //     categoryItem.modelSetId === uniqItem.modelSetId){


                //     }
                // })
            })
        }
    }
    console.log(`job done.`);
    
});

