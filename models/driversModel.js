const mongoose = require('mongoose'); 

//estructura de bd for users-drivers
const userSchema = new mongoose.Schema({
    firstName: {type: String},
    Lastname: { type: String },
    email: {type: String}, //email: {type: String, immutable: true}
    password: {type: String}, //password: {type: String, select: false}
    address: {type: String},
    country: {type: String},
    state: {type: String},
    city: {type: String},
    phoneNumber: { type: Number }, //phoneNumber: { type: Number, immutable: true }
    vehicleBrand: {type: String},
    vehicleModel:{type: String},
    vehicleYear:{type: Number},
    vehiclePlate:{type: String},

});


module.exports = mongoose.model('Driver', userSchema);