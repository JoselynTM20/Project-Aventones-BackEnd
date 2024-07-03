// driversControllers.js
const Driver = require("../models/DriversModel");
const bcrypt = require('bcryptjs');

const DriverPost = async (req, res) => {
    try {
        const { firstName, Lastname, cardIdNumber, BirthDate, email, password, phoneNumber, carBrand, carModel, carYear, licensePlate } = req.body;

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Verificar si ya existe un conductor con el mismo correo electrónico
        const existingDriver = await Driver.findOne({ email: email });
        if (existingDriver) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const newDriver = new Driver({
            firstName,
            Lastname,
            cardIdNumber,
            BirthDate,
            email,
            password: hashedPassword,
            phoneNumber,
            carBrand,
            carModel,
            carYear,
            licensePlate
        });

        await newDriver.save();
        res.status(201).json(newDriver);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
const DriverGet = (req, res) => {
    if (req.query && req.query.id) {
        Driver.findById(req.query.id)
            .then((driver) => {
                res.json(driver);
            })
            .catch((err) => {
                res.status(404);
                console.log("error", err);
                res.json({ error: "Driver does not exist" });
            });
    } else {
        Driver.find()
            .then((drivers) => {
                res.json(drivers);
            })
            .catch((err) => {
                res.status(433);
                res.json({ error: err });
            });
    }
};

module.exports = { DriverPost, DriverGet };