// figures out what set of credentials to return
var prod = true;


if (prod) {
    module.exports = {
        mongoURI: process.env.MONGODB_URI
    };
} else {
    module.exports = require('./dev');
}
