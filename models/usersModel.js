const mongoose = require('mongoose'); 

//estructura de bd for users-client
const userSchema = new mongoose.Schema({
    firstName: {type: String},
    Lastname: { type: String },
    cardIdNumber: {type: Number},
    BirthDate: {type: Number},
    email: {type: String},
    password: {type: String},
    phoneNumber: { type: Number }
    
});

module.exports = mongoose.model('User', userSchema);

