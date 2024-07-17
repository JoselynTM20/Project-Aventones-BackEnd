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
        Booking.findById(req.query.id)
            .then((booking) => {
                if (!booking) {
                    return res.status(404).json({ error: 'Booking not found' });
                }
                res.json(booking);
            })
            .catch((err) => {
                console.error('Error finding booking:', err);
                res.status(500).json({ error: 'Internal server error' });
            });
    } else if (req.query && req.query.userId) {
        Booking.find({ userId: req.query.userId })
            .then((bookings) => {
                res.json(bookings);
            })
            .catch((err) => {
                console.error('Error finding bookings:', err);
                res.status(500).json({ error: 'Internal server error' });
            });
    } else if (req.query && req.query.rideId) {
        Booking.find({ rideId: req.query.rideId })
            .then((bookings) => {
                res.json(bookings);
            })
            .catch((err) => {
                console.error('Error finding bookings:', err);
                res.status(500).json({ error: 'Internal server error' });
            });
    } else {
        Booking.find()
            .populate('userId', 'firstName') // Asegúrate de que 'userId' coincida con el nombre correcto en tu modelo
            .then((bookings) => {
                res.json(bookings);
            })
            .catch((err) => {
                console.error('Error finding bookings:', err);
                res.status(500).json({ error: 'Internal server error' });
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