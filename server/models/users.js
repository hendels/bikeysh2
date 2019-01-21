const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: String,
    login: String,
    password: String,
    permissionSet: String,
});
//#create mongo model (table) - two arguments [name, schema]
mongoose.model('users', UserSchema);
const Users = mongoose.model('users', UserSchema);

exports.createUser = async (data) => {
    await new Users({
        name: data.name,
        login: data.login,
        password: data.password,
        permissionSet: data.permissionSet,
    })
    .save()
    .then(() => {
        console.log(`[*][*][*] creating User [${data.name}]...`);
    });
};