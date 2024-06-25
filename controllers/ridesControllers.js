// ridesControllers.js
const RidesDriver = require('../models/RidesDriversModel.js');

const RidesDriverPost = async (req, res) => {
    try {
        const { departureFrom, arriveTo, days, time, seats, fee, vehicle, userId } = req.body;

        const newRide = new RidesDriver({
            departureFrom,
            arriveTo,
            days,
            time,
            seats,
            fee,
            vehicle,
            userId  // Guardar userId en el documento de ride
        });

        await newRide.save();
        return res.status(201).json(newRide);
    } catch (error) {
        console.log('Error creating ride:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const RidesDriverGet = (req, res) => {
    if (req.query && req.query.id) { // El objeto tiene una propiedad id
        RidesDriver.findById(req.query.id) // Buscar un ride específico por su ID
        .then((ridedriver) => { // Si se encuentra el ride, se devuelve en formato JSON como respuesta.
          res.json(ridedriver);
        })
        .catch((err) => { // Si no se encuentra, se envía un error
          res.status(404);
          console.log("error", err);
          res.json({ error: "Ride does not exist" });
        });
    } else { // Si no se proporciona un ID, se devuelven todos los rides
        RidesDriver.find()
        .then((ridedriver) => {
          res.json(ridedriver);
        })
        .catch((err) => {
          res.status(433);
          res.json({ error: err });
        });
    }
};

const updateRideDriver = async (req, res) => {
    try {
        const rideId = req.params.id;
        const updateData = req.body;

        const updatedRide = await RidesDriver.findByIdAndUpdate(rideId, updateData, { new: true });

        if (!updatedRide) {
            return res.status(404).json({ error: 'Ride not found' });
        }

        return res.status(200).json(updatedRide);
    } catch (error) {
        console.log('Error updating ride:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteRide = (req, res) => {
    const rideId = req.params.id; // Obtén el ID del ride desde los parámetros de la solicitud

    RidesDriver.findByIdAndDelete(rideId)
        .then(() => {
            res.json({ message: 'Ride deleted successfully' });
        })
        .catch((err) => {
            console.error('Error deleting ride:', err);
            res.status(500).json({ error: 'Failed to delete ride' });
        });
};



module.exports = { RidesDriverPost, RidesDriverGet, updateRideDriver, deleteRide };
