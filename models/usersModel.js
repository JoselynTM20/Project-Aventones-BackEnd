const mongoose = require('mongoose'); 

//estructura de bd for users-client
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


//Metodo para actualizar de manera segura la contraseña desde el form.
/*userSchema.methods.updatePassword = function(newPassword) {
    // Lógica para actualizar la contraseña de manera segura
    this.password = newPassword;
    return this.save();*/