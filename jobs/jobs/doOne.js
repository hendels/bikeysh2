const mongoose = require('mongoose');
const keys = require('../../config/keys.js');

require('./models/bmart_crank');

module.exports = function(agenda) {
    agenda.define('crawl bikemarkt', function(job, done) {

        // Connect to the db
        // mongoose.connect(keys.mongoURI, function(err, db) {
            // if(!err) {
                console.log('crawling by agenda');
                
                db.collection('cranks').findOneAndUpdate({_id: "5b96c1af5f08c319d238bc69"},
                    { $set: { color: 'JOBOBOB' }}, function (err) {
                    if(!err) {
                        done();
                    }
                })
            // }
            // if(err) {
            //     console.log(err);
            //     done();
            // }
        // });
    });
};