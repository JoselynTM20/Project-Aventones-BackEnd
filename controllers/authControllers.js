// authControllers.js
const bcrypt = require('bcryptjs');
const User = require('../models/usersModel');
const Driver = require('../models/driversModel');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar el usuario en la colección de usuarios
        const user = await User.findOne({ email });
        if (!user) {
            // Si el usuario no existe, buscar en la colección de conductores
            const driver = await Driver.findOne({ email });
            if (!driver) {
                return res.status(404).json({ error: 'User not found' });
            } else {
                // Validar contraseña para conductor
                const isValidPassword = await driver.isValidPassword(password);
                if (!isValidPassword) {
                    return res.status(401).json({ error: 'Invalid password' });
                }
                return res.status(200).json({ userType: 'driver', userId: driver._id });
            }
        }

        // Validar contraseña para usuario
        const isValidPassword = await user.isValidPassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        return res.status(200).json({ userType: 'user', userId: user._id });
    } catch (error) {
        console.log('Error logging in:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { login };
