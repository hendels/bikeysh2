// figures out what set of credentials to return
const config = require('./config');


if (config.prod) {
    module.exports = {
        mongoURI: process.env.MONGODB
    };
} else {
    module.exports = require('./dev');
}
