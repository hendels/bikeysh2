const mongoose = require('mongoose');
const {Schema} = mongoose;

const NameSetSchema = new Schema({
    setId: Number,
    name: String,
    count: Number
});
//#create mongo model (table) - two arguments [name, schema]
mongoose.model('nameSets', NameSetSchema);
const NameSet = mongoose.model('nameSets', NameSetSchema);

exports.create = async (data) => {
    await new NameSet({
        setId: data.lastSetNumber,
        name: data.tagName,
        count: 1 // << reason for counter is defining name for item, get the higher counter 
    })
    .save()
    .then(() => {
        console.log(`[*][*][*] creating Similar Name [${data.tagName} with new number: ${data.lastSetNumber}]...`);
    });
};