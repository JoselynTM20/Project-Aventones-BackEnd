// ridesControllers.js
const RidesDriver = require('../models/RidesDriversModel.js');

const RidesDriverPost= async (req, res) => {
    try {
        const { departureFrom, arriveTo, days, time, seats, fee, vehicle } = req.body;

        const newRide = new RidesDriver({
            departureFrom,
            arriveTo,
            days,
            time,
            seats,
            fee,
            vehicle: {
                make: vehicle.make,
                model: vehicle.model,
                year: vehicle.year
            }
        });

        await newRide.save();
        return res.status(201).json(newRide);
    } catch (error) {
        console.log('Error creating ride:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};





module.exports = { RidesDriverPost };
