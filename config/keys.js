// figures out what set of credentials to return
var prod = true;


if (prod) {
    module.exports = {
        mongoURI: process.env.MONGODB
    };
} else {
    module.exports = require('./dev');
}
