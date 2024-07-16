const Booking = require('../models/BookingsModels');

const BookingPost = async (req, res) => {
    try {
        const { userId, rideId, status } = req.body;

        const newBooking = new Booking({
            userId,
            rideId,
            status // por ejemplo: 'pending', 'accepted', 'rejected'
        });

        await newBooking.save();
        return res.status(201).json(newBooking);
    } catch (error) {
        console.log('Error creating booking:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const BookingGet = (req, res) => {
    if (req.query && req.query.id) {
        // Buscar una reserva específica por su ID
        Booking.findById(req.query.id)
            .then((booking) => {
                res.json(booking); // Devuelve la reserva encontrada en formato JSON
            })
            .catch((err) => {
                res.status(404); // Establece el código de estado 404 (Not Found)
                console.log("error", err);
                res.json({ error: "Booking does not exist" }); // Devuelve un mensaje de error en formato JSON
            });
    } else if (req.query && req.query.userId) {
        // Si se proporciona un userId, se devuelven las reservas de ese usuario
        Booking.find({ userId: req.query.userId })
            .then((booking) => {
                res.json(booking); // Devuelve las reservas encontradas en formato JSON
            })
            .catch((err) => {
                res.status(433); // Establece un código de estado 433 (Custom error)
                res.json({ error: err }); // Devuelve el error encontrado en formato JSON
            });
    } else if (req.query && req.query.rideId) {
        // Si se proporciona un rideId, se devuelven las reservas de ese ride
        Booking.find({ rideId: req.query.rideId })
            .then((booking) => {
                res.json(booking); // Devuelve las reservas encontradas en formato JSON
            })
            .catch((err) => {
                res.status(433); // Establece un código de estado 433 (Custom error)
                res.json({ error: err }); // Devuelve el error encontrado en formato JSON
            });
    } else {
        // Si no se proporciona un ID, userId o rideId, se devuelven todas las reservas
        Booking.find()
            .populate('UserId', 'firtsname') // Esto incluirá el nombre del driver en los resultados
            .then((booking) => {
                res.json(booking); // Devuelve todas las reservas encontradas en formato JSON
            })
            .catch((err) => {
                res.status(433); // Establece un código de estado 433 (Custom error)
                res.json({ error: err }); // Devuelve el error encontrado en formato JSON
            });
    }
};

const UpdateBooking = async (req, res) => {
    const bookingId = req.params.id; // Aquí asumimos que el ID viene como parte de la URL
  
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        {
          $set: {
            status: req.body.status // por ejemplo: 'accepted', 'rejected'
          }
        },
        { new: true, runValidators: true }
      );
  
      if (!updatedBooking) {
        return res.status(404).json({ error: "Booking not found" });
      }
  
      res.status(200).json(updatedBooking);
    } catch (error) {
      console.error('Error updating booking:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const DeleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id; // Obtener el ID de la reserva de los parámetros de la ruta

        // Buscar y eliminar la reserva por su ID
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);

        if (!deletedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { BookingPost, BookingGet, UpdateBooking, DeleteBooking };