const mongoose = require('mongoose');
var cron = require('node-cron');
const tags = require('../../models/tags');
const tagMgt = require('../../db_management/tagManagement');
const genMgt = require('../../db_management/generalManagement');
const Tags = mongoose.model('tags');
//get offer strings => start from title
//[to do - get other strings and translate through google translator to english]

return new Promise(async (resolve, reject) => {
    let counter = 0;
    // cron.schedule('* * * *', async () => {
        counter += 1;
        console.log(`starting job === fill tags [job no. ${counter}]`);
        let modelList = [`cranks`, `dhframes`, `enduroframes`, `wheels`, `hubs`];
        for (var iModel = 0; iModel < modelList.length; iModel++){

            let currentCategory = modelList[iModel];

            const Model = await mongoose
                .model(currentCategory)
                .find()
                .select({ bmartId: false, __v: false });
            Model.map(async offer => {
                //console.log(offer.title);
                const titleWords = offer.title.split(" ");
                // # add to array incoming words [todo] (from translated description too)
                //const offer.description => translate
                //Array = [titleWords, other]
                for (var i = 0; i < titleWords.length; i++){
                    // # check if offer has assigned current tag
                    //console.log(`...searching for pair: ${titleWords[i]} + ${offer.id}`);
                    const currentTag = titleWords[i];
                    const SearchCurrentTag = await mongoose
                        .model('tags')
                        .find({ tagName: currentTag, offerId: offer.id})
                        .select({bmartId: false});
                    // # if tag has been found => skip later checking
                    if (SearchCurrentTag.length === 0){
                        //console.log(`...not found pair: ${titleWords[i]} + ${offer.id}`);
    
                        const SearchTagSet = await mongoose
                        .model('tags')
                        .find({ tagName: currentTag, category: currentCategory})
                        .select({bmartId: false});
                        if(SearchTagSet.length > 0){
                            // # there is my array of offer with specific tag 
                            //console.log(SearchTagSet);
                            let tagCounter = {
                                manufacturerCount: 0,
                                modelCount: 0,
                                groupCount: 0
                            };
                            let properGroup = ``;
                            SearchTagSet.map(foundOffer => {
                                console.log(`offer ${offer.id} with set of tags manufacturer: ${foundOffer.manufacturerTag} 
                                    model: ${foundOffer.modelTag} group: ${foundOffer.groupTag}`)
                                if (foundOffer.manufacturerTag === currentTag) tagCounter.manufacturerCount += 1;
                                if (foundOffer.modelTag === currentTag) tagCounter.modelCount += 1;
                                if (foundOffer.groupTag === currentTag) tagCounter.groupCount += 1;
                            })
                            // # assign proper group
                            if (tagCounter.manufacturerCount > 0 && tagCounter.modelCount === 0 && tagCounter.groupCount === 0) 
                                properGroup = `Manufacturer`;
                            if (tagCounter.modelCount > 0 && tagCounter.groupCount === 0 && tagCounter.manufacturerCount === 0) 
                                properGroup = `Model`;
                            if (tagCounter.groupCount > 0 && tagCounter.manufacturerCount === 0 && tagCounter.modelCount === 0)
                                properGroup = `Group`;
                            // # create tag based on references
                            if (properGroup !== ``){
                                let freshTag = {
                                    offerId: offer.id,
                                    offerOrigin: `bikemarkt`,
                                    tagName: currentTag,
                                    category: currentCategory,
                                    manufacturerTag: properGroup === `Manufacturer` ? currentTag : null,
                                    modelTag: properGroup === `Model` ? currentTag : null,
                                    groupTag: properGroup === `Group` ? currentTag : null,
                                    count: 0,
                                    price: offer.price,
                                }
                                await tags.create(freshTag);
                                Tags.findOne({ offerId: freshTag.offerId, tagName: freshTag.tagName}).then(async existingTag => {
                                    if (existingTag) {
                                        const tagPairNo = await tagMgt.defineTagPair(freshTag.offerId, freshTag.tagName, properGroup)
                                        await tagMgt.updateModel(tags, existingTag, freshTag.tagName, properGroup, tagPairNo);
                                        await genMgt.updateTagCounter(freshTag.offerId, currentCategory, 5);
                                    }
                                })

                            } else console.log('!!!fatal error, found tag but without core group!!!')
                            
                        }else
                        {
                            //console.log(`...not found anywhere reference tag: ${titleWords[i]} + ${currentCategory}, you need to add first pair manually`)
                        }
                    } else {
                        // console.log(`tag has been found for pair ${titleWords[i]} + ${offer.id}`);
                    }
                    
                }
                //search for category cranks
                
    
            })    
        }
        console.log('running a task every min ' + counter);
        console.log(`job done.`);
    // });
    
});



//fill sure percent as sign, that offer were calculated
//[todo]  add table with same meaning of tags e.g => e13 / e*thirteen / e thirteen