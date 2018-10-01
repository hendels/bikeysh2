const mongoose = require('mongoose');
const {Schema} = mongoose;

const GlobalSetupSchema = new Schema({
    setupId: Number,
    lastNumberNameSets: Number,
    lastNumberPairOfNameSets: Number
});
//#create mongo model (table) - two arguments [name, schema]
mongoose.model('globalSetups', GlobalSetupSchema);
const Setup = mongoose.model('globalSetups', GlobalSetupSchema);
exports.updateLastNumberNameSets = async (id, lastNumber) => {
    await Setup.findById(id, (err, globalSetup) => {
        globalSetup.lastNumberNameSets = lastNumber;
        globalSetup.save().then(() => {
            console.log('[][][] update number for global setup - NameSets...');
        });
    });    
};
exports.updateLastNumberPairOfNameSets = async (id, lastNumber) => {
    await Setup.findById(id, (err, globalSetup) => {
        globalSetup.lastNumberPairOfNameSets = lastNumber;
        globalSetup.save().then(() => {
            console.log('[][][] update number for global setup - PairNo...');
        });
    });    
};
exports.createSetup = async (data) => {
    await new Setup({
        setupId: 1,
        lastNumberNameSets: 1 
    })
    .save()
    .then(() => {
        console.log(`[*][*][*] creating Setup ...`);
    });
};