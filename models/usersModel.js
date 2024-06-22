const mongoose = require('mongoose'); 

//estructura de bd
const userSchema = new mongoose.Schema({
    firstName: {type: String},
    Lastname: { type: String },
    email: {type: String},
    password: {type: String},
    address: {type: String},
    country: {type: String},
    state: {type: String},
    city: {type: String},
    phoneNumber: { type: Number },
});


module.exports = mongoose.model('User', userSchema);