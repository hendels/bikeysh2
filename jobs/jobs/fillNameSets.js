const mongoose = require('mongoose');
var cron = require('node-cron');
const nameSets = require('../../models/name_sets');
const globalSetup = require('../../models/global_setup');

return new Promise(async (resolve, reject) => {
    let counter = 0;
    counter += 1;
    const SearchCurrentTag = await mongoose
        .model('tags')
        .find()
        .select({bmartId: false});
    for (var iModel = 0; iModel < SearchCurrentTag.length; iModel++){

        const NameSets = await mongoose
            .model('nameSets')
            .find({name: SearchCurrentTag[iModel].tagName})
            .select({ setId: false });
            

        if(NameSets.length === 0 ){

            const GlobalSetup = await mongoose
                .model('globalSetups')
                .find({setupId: 1})
                .select({ setupId: false });
            const data = {
                tagName: SearchCurrentTag[iModel].tagName,
                lastSetNumber :GlobalSetup[0].lastNumberNameSets + 1
            }
            await globalSetup.updateLastNumberNameSets(GlobalSetup[0]._id, data.lastSetNumber);
            await nameSets.create(data);
        }
    }
    console.log('running a task every min ' + counter);
    console.log(`job done.`);
    
});

