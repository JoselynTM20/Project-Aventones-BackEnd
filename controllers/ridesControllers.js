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
        .populate('userId', 'firstName lastName') // Hacer populate para incluir el nombre del driver
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
            .populate('userId', 'name') // Hacer populate para incluir el nombre del driver
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
            .populate('userId', 'name') // Hacer populate para incluir el nombre del driver
            .then((ridedriver) => {
                res.json(ridedriver); // Devuelve todos los rides encontrados en formato JSON
            })
            .catch((err) => {
                res.status(433); // Establece un código de estado 433 (Custom error)
                res.json({ error: err }); // Devuelve el error encontrado en formato JSON
            });
    }
};

const RidesDriverGetById = (req, res) => {
    const rideId = req.params.id; // Obtén el ID del ride desde los parámetros de la URL

    if (rideId) {
        // Buscar un ride específico por su ID
        RidesDriver.findById(rideId)
            .populate('userId', 'firstName lastName') // Hacer populate para incluir el nombre del driver
            .then((ridedriver) => {
                if (!ridedriver) {
                    return res.status(404).json({ error: "Ride does not exist" }); // Devuelve un mensaje de error si el ride no existe
                }
                res.json(ridedriver); // Devuelve el ride encontrado en formato JSON
            })
            .catch((err) => {
                console.error('Error fetching ride:', err);
                res.status(500).json({ error: "Internal server error" }); // Devuelve un mensaje de error en caso de fallo
            });
    } else {
        res.status(400).json({ error: "Missing ride ID" }); // Devuelve un mensaje de error si falta el ID del ride en la solicitud
    }
};


const updateRideDriver = async (req, res) => {
    const { rideId } = req.params;
    const updates = req.body;

    console.log('Request params:', req.params);
    console.log('Request body:', req.body);

    try {
        const ride = await RidesDriver.findById(rideId);
        if (!ride) {
            console.log('Ride not found');
            return res.status(404).json({ error: 'Ride not found' });
        }

        // Verificar que el usuario autenticado sea el propietario del ride
        if (ride.userId.toString() !== req.user.id) {
            console.log('Forbidden: User does not own the ride');
            return res.status(403).json({ error: 'Forbidden' });
        }

        // Actualizar solo los campos permitidos
        const allowedUpdates = ['departureFrom', 'arriveTo', 'days', 'time', 'seats', 'fee', 'vehicle'];
        allowedUpdates.forEach((key) => {
            if (updates[key] !== undefined) {
                ride[key] = updates[key];
            }
        });

        console.log('Updated ride before saving:', ride);

        await ride.save();
        res.status(200).json(ride);
    } catch (error) {
        console.error('Error updating ride:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
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


const getRidesByDriver = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        
        const rides = await Ride.find({ userId });
        res.status(200).json(rides);
    } catch (error) {
        console.error('Error fetching rides:', error);
        res.status(500).json({ error: 'Server error' });
    }
};






module.exports = { RidesDriverPost, RidesDriverGet, updateRideDriver, deleteRide, getRidesByDriver, RidesDriverGetById };
