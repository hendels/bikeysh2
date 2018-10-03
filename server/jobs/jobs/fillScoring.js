const mongoose = require('mongoose');
var cron = require('node-cron');
const scoring = require('../../models/scoring');
const nameSets = require('../../models/name_sets');
const _ = require('underscore');

return new Promise(async (resolve, reject) => {
    let counter = 0;
    console.log(`starting job === create scoring [beta] [job no. ${counter}]`);
    let modelList = [`cranks`, `dhframes`, `enduroframes`, `wheels`, `hubs`];
    for (var iModel = 0; iModel < modelList.length; iModel++){
        let currentCategory = modelList[iModel];

            const Model = await mongoose
                .model(currentCategory)
                .find()
                .select({  __v: false });

            // let Manufacturers = {manufacturer:{name: "", nameNum: 0}};
            let Manufacturers = [];
            let Models = [];
            let Groups = [];
            let offerInfo ={
                category: ``,
                origin: ``,
                price: 0
            }
            Model.map(async offer => {
                const SearchCurrentOffer = await mongoose
                    .model('tags')
                    .find({ offerId: offer.id})
                    .select({__v: false});

                if (SearchCurrentOffer.length !== 0){
                    let tagCounter = {
                        manufacturerCount: 0,
                        modelCount: 0,
                        groupCount: 0
                    };
                    let arrayManufacturer = [];
                    let arrayModel = [];
                    let arrayGroup = [];

                    SearchCurrentOffer.map(specificOffer => {
                        if (specificOffer.manufacturerTag !== `` && specificOffer.manufacturerTag !== null) {
                            tagCounter.manufacturerCount += 1;
                            arrayManufacturer.push(specificOffer.manufacturerTag);
                        } 
                            
                        if (specificOffer.modelTag !== `` && specificOffer.modelTag !== null) {
                            tagCounter.modelCount += 1;
                            arrayModel.push(specificOffer.modelTag);
                        }
                        if (specificOffer.groupTag !== `` && specificOffer.groupTag !== null) {
                            tagCounter.groupCount += 1;
                            arrayGroup.push(specificOffer.groupTag);
                        }
                        offerInfo.category = specificOffer.category;
                        offerInfo.origin = specificOffer.offerOrigin;
                        offerInfo.price = specificOffer.price;
                    })
                    
                    if (tagCounter.manufacturerCount !== 0 && tagCounter.modelCount !== 0){
                        //collide together tags => check for duplicate tags => erase duplicates 
                        function defineArray(offerDetails) {
                            return new Promise(async resolve => {
                                var uniqManufacturer = [...new Set(arrayManufacturer)];
                                arrayManufacturer = [];
                                const defineManufacturers = await uniqManufacturer.map(async item => {
                                    //uzupełnij tabele manufacturers
                                    // <<[todo] jezeli znalazles juz w tabelce Manufacturers ITEM, to olej wyszukiwanie
                                        const NameSets = await mongoose
                                            .model('nameSets')
                                            .find({name: item})
                                            .select();
                                        const PairSets = await mongoose
                                            .model('tags')
                                            .find({tagName: item})
                                            .select();
                                        //console.log(PairSets);
                                        var counts = {};
                                        PairSets.forEach((x) => {counts[x.manufacturerTagPair] = (counts[x.manufacturerTagPair] || 0)+1;});
                                        var bestPair = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
                                        // console.log(`best value = ${bestPair}`);
                                        var newObj = {
                                            name: item, 
                                            nameNum: NameSets[0].setId,
                                            pairNum: parseInt(bestPair),
                                        };
                                        Manufacturers.push(newObj);
                                    //>>koncz warunek
                                    arrayManufacturer.push(newObj);
                                })
                                Promise.all(defineManufacturers).then(async () => {
                                    var uniqModel = [...new Set(arrayModel)];
                                    arrayModel = [];
                                    const defineModels = await uniqModel.map(async item => {
                                    //uzupełnij tabele models
                                        // <<[todo] jezeli znalazles juz w tabelce Models ITEM, to olej wyszukiwanie
                                            const NameSets = await mongoose
                                                .model('nameSets')
                                                .find({name: item})
                                                .select();
                                            const PairSets = await mongoose
                                                .model('tags')
                                                .find({tagName: item})
                                                .select();
                                            //console.log(PairSets);
                                            var countModelPairs = {};
                                            PairSets.forEach((x) => {countModelPairs[x.modelTagPair] = (countModelPairs[x.modelTagPair] || 0)+1;});
                                            var bestPair = Object.keys(countModelPairs).reduce((a, b) => countModelPairs[a] > countModelPairs[b] ? a : b);
                                            // console.log(`best value = ${bestPair}`);
                                            var newObj = {
                                                name: item, 
                                                nameNum: NameSets[0].setId,
                                                pairNum: parseInt(bestPair)
                                            };
                                            Models.push(newObj);
                                        //>>koncz warunek
                                        arrayModel.push(newObj);   
                                    });

                                    Promise.all(defineModels).then(async () => {
                                        //console.log(arrayManufacturer);
                                        //console.log(arrayModel);
                                        // sprawdz czy pairNumber jest równy we wszystkich elementach, jezeli nie to olej
                                        // arrayManufacturer.map(item => {
                                            var countPairManufacturer = {};
                                            var countPairModel = {};
                                            arrayManufacturer.forEach((x) => {countPairManufacturer[x.pairNum] = (countPairManufacturer[x.pairNum] || 0)+1;});
                                            arrayModel.forEach((x) => {countPairModel[x.pairNum] = (countPairModel[x.pairNum] || 0)+1;});
                                            //console.log(countPairManufacturer);
                                            let allowInsert = false;
                                            switch (true){
                                                case Object.keys(countPairManufacturer).length > 1 || 
                                                     Object.keys(countPairModel).length > 1:
                                                    //nie mozesz dodac blednych par, czasami tak jest jak ktos zle uzupelni opis np Truvativ / SRAM
                                                    break;
                                                case Object.keys(countPairManufacturer).length === 0 || 
                                                     Object.keys(countPairModel).length === 0: 
                                                    //fatal error
                                                    break;
                                                case Object.keys(countPairManufacturer).length === 1 && 
                                                     Object.keys(countPairModel).length === 1: 
                                                    //dodaj
                                                    allowInsert = true;
                                                    break;
                                                default:
                                                    break;
                                            }
                                            if (allowInsert){
                                                const Scoring = await mongoose
                                                .model('scoring')
                                                .find({offerId: offer.id})
                                                .select();
                                                if (Scoring.length === 0){
                                                    
                                                    const TagPairManufacturer = await mongoose
                                                        .model('tags')
                                                        .find({manufacturerTagPair: arrayManufacturer[0].pairNum})
                                                        .select();
                                                    countPairManufacturer = {};
                                                    TagPairManufacturer.forEach((x) => {
                                                        countPairManufacturer[x.manufacturerTag] = (countPairManufacturer[x.manufacturerTag] || 0)+1;
                                                    });
                                                    let arrValues = Object.values(countPairManufacturer);
                                                    let arrKeys = Object.keys(countPairManufacturer);
                                                    let maxValue = Math.max(...arrValues);
                                                        
                                                    let sortedObj = _.sortBy(TagPairManufacturer, (obj)=> {return obj.manufacturerTagPair});
                                                    let uniqueObj = _.uniq(sortedObj, (item, key, name) => {return item.manufacturerTag;});
                                                    Array.prototype.forEach.call(uniqueObj, function(child) {
                                                        //countPairManufacturer
                                                        for (var z = 0 ; z < arrKeys.length; z++){
                                                            if(arrKeys[z] === child.manufacturerTag){
                                                                objCount = {tagCounter: arrValues[z]};
                                                                Object.assign(child, objCount);
                                                            }
                                                        }
                                                    });

                                                    // let filteredArray = uniqueObj.filter(value => {return value.tagCounter >= maxValue * 0.8});
                                                    // let ManufacturerName = filteredArray.tagName.join(" ");
                                                    let ManufacturerName = uniqueObj.map(e => {
                                                        if(e.tagCounter >= maxValue * 0.8 ) //<< 20% of usage spread is acceptable
                                                        {return e.tagName}
                                                    }).join(" ");

                                                    const TagPairModel = await mongoose
                                                        .model('tags')
                                                        .find({modelTagPair: arrayModel[0].pairNum})
                                                        .select();
                                                    countPairModel = {};
                                                    TagPairModel.forEach((x) => {
                                                        countPairModel[x.modelTag] = (countPairModel[x.modelTag] || 0)+1;
                                                    });
                                                    arrValues = Object.values(countPairModel);
                                                    arrKeys = Object.keys(countPairModel);
                                                    maxValue = Math.max(...arrValues);

                                                    sortedObj = _.sortBy(TagPairModel, (obj)=> {return obj.modelTagPair});
                                                    uniqueObj = _.uniq(sortedObj, (item, key, name) => {return item.modelTag;})

                                                    Array.prototype.forEach.call(uniqueObj, function(child) {
                                                        //countPairManufacturer
                                                        for (var z = 0 ; z < arrKeys.length; z++){
                                                            if(arrKeys[z] === child.modelTag){
                                                                objCount = {tagCounter: arrValues[z]};
                                                                Object.assign(child, objCount);
                                                            }
                                                        }
                                                    });
                                                    // let ModelName = uniqueObj.map(e => e.tagName).join(" ");
                                                    let ModelName = uniqueObj.map(e => {
                                                        if(e.tagCounter >= maxValue * 0.8 ) //<< 20% of usage spread is acceptable
                                                        {return e.tagName}
                                                    }).join(" ");
                                                    // let ModelName = uniqueObj.filter(value => {return value.tagCounter >= maxValue * 0.8})
                                                    // .join(" ");
                                                    // # define year from offer title => if not found from description
                                                    let search = offer.title.split(/[^\d]/).filter(n => {if((n>=2000)&&(n<=2030)) return n});
                                                    let yearTitle = search.length > 0 ? search[0]: 0;
                                                    let yearDescription = 0;
                                                    if (search.length === 0){
                                                        //# search in description
                                                        search = offer.description.split(/[^\d]/).filter(n => {if((n>=2000)&&(n<=2030)) return n});
                                                        yearDescription = search.length > 0 ? search[0]: 0;
                                                    }
                                                    // # define currency
                                                    let getCurrency = offer.price.search('€') > -1 ? 'EUR' : 'none';
                                                    // # tweak price
                                                    let priceString = offer.price;
                                                    priceString = priceString.split('€').join(``);
                                                    var amountRegex = /(^([1-9]+?\.?\,*[0-9]+))/;
                                                    var execRegex = amountRegex.exec(priceString);
                                                    var cut = execRegex[0].split(`,`).join(``).split(`.`).join(``);
                                                    let getAmount = parseInt(cut);
                                                    console.log(`orginal price ${offer.price} --- converted to: ${getAmount}`);
                                                    // 
                                                    scoringObj = {
                                                        offerId: offer.id,
                                                        offerOrigin: offerInfo.origin,
                                                        fullName: `${ManufacturerName} - ${ModelName}`,
                                                        category: offerDetails.category,
                                                        manufacturerSetId: arrayManufacturer[0].pairNum,
                                                        modelSetId: arrayModel[0].pairNum,
                                                        price: getAmount,
                                                        currency: getCurrency,
                                                        yearTitle: yearTitle,
                                                        yearDescription: yearDescription                                        
                                                    }

                                                    scoring.create(scoringObj);
                                                } else{
                                                    console.log(`scoring exist for offer ${offer.id}`)
                                                }
                                            } else {
                                                console.log(`can't add offer: ${offer.id}: `);
                                                console.log(countPairManufacturer);
                                                console.log(countPairModel);
                                            }
                                        // })
                                    })
                                //     var sortedObj = _.sortBy(Manufacturers, (obj)=> {return obj.nameNum});
                                //     var uniqueObj = _.uniq(sortedObj, (item, key, name) => {
                                //         return item.name;
                                //     })
                                //     console.log(`sorted manufacturers`);
                                //     console.log(uniqueObj);
                                //     // const defineManufacturers = await uniqueObj.map(async item => {
                                    
                                //     // })
                                })
                                // var uniqModel = [...new Set(arrayModel)];
                                // var uniqGroup = [...new Set(arrayGroup)];
                                

                                //znajdź ofertę

                                //zaktualizuj rekord lub utworz rekord
                                // console.log(currentCategory);
                                resolve()                                 
                            });
                        }
                        await defineArray(offerInfo);
                        // console.log(`wait for it!`);
                    }
                }           
            })
    }
});
