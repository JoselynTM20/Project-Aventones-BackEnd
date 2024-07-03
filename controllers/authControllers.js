const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UsersModel');
const Driver = require('../models/DriversModel');

// Generar token JWT
const generateToken = (userId, userType) => {
    const payload = { userId, userType };
    const options = { expiresIn: '1h' }; // Configura el tiempo de expiración del token según tu necesidad
    const secret = 'sientre'; // Cambia esta clave por una más segura en producción
    return jwt.sign(payload, secret, options);
};

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
                
                const token = generateToken(driver._id, 'driver');
                return res.status(200).json({ userType: 'driver', userId: driver._id, token });
            }
        }

        // Validar contraseña para usuario
        const isValidPassword = await user.isValidPassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = generateToken(user._id, 'user');
        return res.status(200).json({ userType: 'user', userId: user._id, token });
    
    } catch (error) {
        console.log('Error logging in:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { login };

