// figures out what set of credentials to return
var prod = false;

if (prod) {
} else {
    module.exports = require('./dev');
}
