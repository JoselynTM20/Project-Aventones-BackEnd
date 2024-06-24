const mongoose = require('mongoose'); 

// Estructura de la base de datos para los conductores
const driverSchema = new mongoose.Schema({
    firstName: { type: String },
    Lastname: { type: String },
    cardIdNumber: { type: Number },
    BirthDate: { type: String },
    email: { type: String },
    password: { type: String },
    phoneNumber: { type: Number },
    carBrand: { type: String },
    carModel: { type: String },
    carYear: { type: Number },
    licensePlate: { type: String }
});


module.exports = mongoose.model('Driver', driverSchema);