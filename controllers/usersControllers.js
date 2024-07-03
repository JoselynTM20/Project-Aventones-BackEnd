const User = require("../models/UsersModel");  //la importacion desde el archivo UsersModel.js
const bcrypt = require('bcryptjs');


const UserPost = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Verifica si ya existe un usuario con el mismo correo electrónico
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        let user = new User();
        user.firstName = req.body.firstName;
        user.Lastname = req.body.Lastname;
        user.cardIdNumber = req.body.cardIdNumber;
        user.BirthDate = req.body.BirthDate;
        user.email = req.body.email;
        user.password = hashedPassword;
        user.phoneNumber = req.body.phoneNumber;

        await user.save();

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};






const UserGet = (req, res) => {
  if (req.query && req.query.id) { //el objeto tiene una propiedad id y Si es así, significa que el cliente está solicitando un usuario específico por su ID.
    User.findById(req.query.id) //buscar un usuario específico por su ID.
      .then((user) => { //Si se encuentra el usuario, se devuelve en formato JSON como respuesta.
        res.json(user);
      })
      .catch((err) => { //caso contrario en consola muestra mensaje de error y a la bd manda un json con mensaje de error
        res.status(404);
        console.log("error", err);
        res.json({ error: "User does not exist" });
      });
  } else { //en este else es para traer los usuarios sin necesidad del ID sino que solo las lista todas en orden en el .then, en el .catch es en caso de dar error
    User.find()
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(433);
        res.json({ error: err });
      });
  }
};

/*const UserPut = async (req, res) => {
  if (req.query && req.query.id) {
    const UserId = req.query.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            UserId, //ID del usuario que será actualizado
            {
                $set: {
                    name: req.body.name,
                    code: req.body.code,
                    description: req.body.description
                }
            },
            { new: true, runValidators: true } //devuelve el doc actualizado al lugar original y valida que los datos enviados sean correctos
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User doesn't exist" }); //esto pasa si el ID no corresponde a ningun usuario
        }

        return res.status(200).json(updatedUser); // si todo sale bien devuelve el usuario editada en un formato json
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'error' });
    }
  }
};

async function UserDelete(req, res) {
  if (req.query && req.query.id) {
    try {
      // Primero, intenta encontrar el usuario para asegurarte de que existe
      const user = await User.findById(req.query.id);
      if (!user) {
        // Si el usuario no existe, devuelve un error 
        return res.status(404).json({ error: "User does not exist" });
      }

      // Si la carrera existe, procede a eliminarla
      await User.deleteOne({ _id: req.query.id });
      return res.status(204).json({});
    } catch (err) {
      console.error("Error while handling the user:", err);
      return res.status(500).json({ error: "There was an error processing the user" });
    }
  } else {
    // Si no se proporciona un ID da error
    return res.status(400).json({ error: "No ID provided" });
  }
};*/


    module.exports = {  //exporta las funciones
        UserPost,
        UserGet,
        /*UserPut,
        UserDelete,*/
      };