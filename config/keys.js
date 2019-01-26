// figures out what set of credentials to return
var prod = false;


if (prod) {
    module.exports = {
        mongoURI: process.env.MONGODB
    };
} else {
    module.exports = require('./dev');
}
