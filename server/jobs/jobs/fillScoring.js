const mongoose = require('mongoose');
var cron = require('node-cron');
const scoring = require('../../models/scoring');
const nameSets = require('../../models/name_sets');
const _ = require('underscore');

return new Promise(async (resolve, reject) => {
    let counter = 0;
    console.log(`starting job === fill tags [job no. ${counter}]`);
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
                        offerInfo.category = specificOffer.offerOrigin;
                        offerInfo.origin = specificOffer.category;
                        offerInfo.price = specificOffer.price;
                    })
                    
                    if (tagCounter.manufacturerCount !== 0 && tagCounter.modelCount !== 0){
                        //collide together tags => check for duplicate tags => erase duplicates 
                        function defineArray() {
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
                                        console.log(arrayManufacturer);
                                        console.log(arrayModel);
                                        // sprawdz czy pairNumber jest równy we wszystkich elementach, jezeli nie to olej
                                        // arrayManufacturer.map(item => {
                                            var countPairManufacturer = {};
                                            var countPairModel = {};
                                            arrayManufacturer.forEach((x) => {countPairManufacturer[x.pairNum] = (countPairManufacturer[x.pairNum] || 0)+1;});
                                            arrayModel.forEach((x) => {countPairModel[x.pairNum] = (countPairModel[x.pairNum] || 0)+1;});
                                            console.log(countPairManufacturer);
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
                                                case Object.keys(countPairManufacturer).length === 1 || 
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
                                                    scoringObj = {
                                                        offerId: offer.id,
                                                        offerOrigin: offerInfo.origin,
                                                        fullName: `to define`,
                                                        category: offerInfo.category,
                                                        manufacturerSetId: arrayManufacturer[0].pairNum,
                                                        modelSetId: arrayModel[0].pairNum,
                                                        price: offerInfo.price,
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
                        await defineArray();
                        // console.log(`wait for it!`);
                    }
                }           
            })
    }
});
