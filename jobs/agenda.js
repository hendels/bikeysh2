const keys = require('../config/keys.js');
//<<task scheduler
const Agenda = require('agenda');

//>>

//task scheduler
let agenda = new Agenda({db: {address: keys.mongoURI, collection: 'jobs'}});
let jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : [];

jobTypes.forEach(function(type) {
    require('./jobs/' + type)(agenda);
});

if(jobTypes.length) {
agenda.on('ready', function() {
    agenda.start();
});
}

function graceful() {
    agenda.stop(function() {
    process.exit(0);
    });
}

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);

module.exports = agenda;