const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

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

// Método para comparar contraseñas
driverSchema.methods.isValidPassword = async function(password) {
    const driver = this;
    const compare = await bcrypt.compare(password, driver.password);
    return compare;
};


module.exports = mongoose.model('Driver', driverSchema);