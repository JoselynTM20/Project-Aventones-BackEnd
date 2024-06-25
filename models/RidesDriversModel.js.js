const mongoose = require('mongoose');

const RidesDriversSchema = new mongoose.Schema({
    departureFrom: { type: String, required: true },
    arriveTo: { type: String, required: true },
    days: { type: [String], required: true },
    time: { type: String, required: true },
    seats: { type: Number, required: true },
    fee: { type: Number, required: true },
    vehicle: {
        make: { type: String, required: true },
        model: { type: String, required: true },
        year: { type: Number, required: true }
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Añadir userId como referencia
});

module.exports = mongoose.model('Rides', RidesDriversSchema);

