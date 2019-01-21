const mongoose = require('mongoose');

exports.loginUser = (login, password, userExist) => {
    const Model = mongoose.model('users');
    Model.find({login: login, password: password}, (err, record) => {
        userExist(record);
    });    
};