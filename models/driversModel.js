const mongoose = require('mongoose'); 

//estructura de bd for users-drivers
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
    vehicleBrand: {type: String},
    vehicleModel:{type: String},
    vehicleYear:{type: Int},
    vehiclePlate:{type: String},

});


module.exports = mongoose.model('Driver', userSchema);