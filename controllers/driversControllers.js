const Driver = require("../models/driversModel");  //la importacion desde el archivo driversModel.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const DriverPost = (req, res) => {  //se encargara de manejar las solicitudes HTTP POST para crear un nuevo conductor.
  
  let driver = new Driver(); //se crea la estructura que va a la base de datos
  driver.firstName = req.body.firstName;    
  driver.Lastname = req.body.Lastname;
  driver.email = req.body.email;
  driver.password = req.body.password;
  driver.address = req.body.address;
  driver.country = req.body.country;
  driver.state = req.body.state;
  driver.city = req.body.city;
  driver.phoneNumber = req.body.phoneNumber;
  driver.vehicleBrand  = req.body.vehicleBrand;
  driver.vehicleModel  = req.body.vehicleModel;
  driver.vehicleYear  = req.body.vehicleYear;
  driver.vehiclePlate  = req.body.vehiclePlate;

  driver
    .save()  //se usa este metodo para cargar, haciendo que si se guarda un conductor exitosamente se ejecuta el bloque de codigo creando en json
    .then(() => {
        res.status(201); 
        res.header({
        location: `/api/driver/?id=${user.id}`,
        });
        res.json(user);
    })
    .catch((err) => {  //si hubo algun error al conductor en la consola se imprime el mensaje de error y a la bd va un json con mensaje de error
        res.status(422); //eror de solicitud
        console.log("error", err);
        res.json({
        error: "error",
        });
    });
    };

const DriverGet = (req, res) => {
  if (req.query && req.query.id) { //el objeto tiene una propiedad id y Si es así, significa que el cliente está solicitando un usuario específico por su ID.
    Driver.findById(req.query.id) //buscar un usuario específico por su ID.
      .then((driver) => { //Si se encuentra el usuario, se devuelve en formato JSON como respuesta.
        res.json(driver);
      })
      .catch((err) => { //caso contrario en consola muestra mensaje de error y a la bd manda un json con mensaje de error
        res.status(404);
        console.log("error", err);
        res.json({ error: "Driver does not exist" });
      });
  } else { //en este else es para traer los conductores sin necesidad del ID sino que solo las lista todas en orden en el .then, en el .catch es en caso de dar error
    User.find()
      .then((driver) => {
        res.json(driver);
      })
      .catch((err) => {
        res.status(433);
        res.json({ error: err });
      });
  }
};

const DriverPut = async (req, res) => {
  if (req.query && req.query.id) {
    const DriverId = req.query.id;

    try {
        const updatedDriver = await Driver.findByIdAndUpdate(
            DriverId, //ID del conductor que será actualizado
            {
                $set: {
                    name: req.body.name,
                    code: req.body.code,
                    description: req.body.description
                }
            },
            { new: true, runValidators: true } //devuelve el doc actualizado al lugar original y valida que los datos enviados sean correctos
        );

        if (!updatedDriver) {
            return res.status(404).json({ error: "Driver doesn't exist" }); //esto pasa si el ID no corresponde a ningun conductor
        }

        return res.status(200).json(updatedDriver); // si todo sale bien devuelve el conductor editada en un formato json
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'error' });
    }
  }
};

async function DriverDelete (req, res) {
  if (req.query && req.query.id) {
    try {
      // Primero, intenta encontrar el conductor para asegurarte de que existe
      const driver = await Driver.findById(req.query.id);
      if (!driver) {
        // Si el conductor no existe, devuelve un error 
        return res.status(404).json({ error: "Driver does not exist" });
      }

      // Si el conductor existe, procede a eliminarlo
      await Driver.deleteOne({ _id: req.query.id });
      return res.status(204).json({});
    } catch (err) {
      console.error("Error while handling the driver:", err);
      return res.status(500).json({ error: "There was an error processing the driver" });
    }
  } else {
    // Si no se proporciona un ID da error
    return res.status(400).json({ error: "No ID provided" });
  }
};

    module.exports = {  //exporta las funciones
        DriverPost,
        DriverGet,
        DriverPut,
        DriverDelete,

       
      };