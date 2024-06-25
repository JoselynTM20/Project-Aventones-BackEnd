const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

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

// Método para comparar contraseñas
userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

module.exports = mongoose.model('User', userSchema);

