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
    if (req.query && req.query.id) {
        // Buscar un ride específico por su ID
        RidesDriver.findById(req.query.id)
            .then((ridedriver) => {
                res.json(ridedriver); // Devuelve el ride encontrado en formato JSON
            })
            .catch((err) => {
                res.status(404); // Establece el código de estado 404 (Not Found)
                console.log("error", err);
                res.json({ error: "Ride does not exist" }); // Devuelve un mensaje de error en formato JSON
            });
    } else if (req.query && req.query.userId) {
        // Si se proporciona un userId, se devuelven los rides de ese conductor
        RidesDriver.find({ userId: req.query.userId })
            .then((ridedriver) => {
                res.json(ridedriver); // Devuelve los rides encontrados en formato JSON
            })
            .catch((err) => {
                res.status(433); // Establece un código de estado 433 (Custom error)
                res.json({ error: err }); // Devuelve el error encontrado en formato JSON
            });
    } else {
        // Si no se proporciona un ID o userId, se devuelven todos los rides
        RidesDriver.find()
            .then((ridedriver) => {
                res.json(ridedriver); // Devuelve todos los rides encontrados en formato JSON
            })
            .catch((err) => {
                res.status(433); // Establece un código de estado 433 (Custom error)
                res.json({ error: err }); // Devuelve el error encontrado en formato JSON
            });
    }
    
};


const updateRide = async (req, res) => {
    const { id } = req.params; // Obtener el ID del ride desde los parámetros de la solicitud
    try {
        const updatedRide = await Ride.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRide) {
            return res.status(404).json({ error: 'Ride not found' });
        }
        res.json(updatedRide); // Devolver el ride actualizado como respuesta
    } catch (error) {
        console.error('Error updating ride:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteRide = async (req, res) => {
    try {
        const rideId = req.params.id; // Obtener el ID del ride de los parámetros de la ruta

        // Buscar y eliminar el ride por su ID
        const deletedRide = await RidesDriver.findByIdAndDelete(rideId);

        if (!deletedRide) {
            return res.status(404).json({ error: 'Ride not found' });
        }

        res.status(200).json({ message: 'Ride deleted successfully' });
    } catch (error) {
        console.error('Error deleting ride:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = { RidesDriverPost, RidesDriverGet, updateRide, deleteRide };
