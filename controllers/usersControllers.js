const User = require("../models/usersModel");  //la importacion desde el archivo careerModel.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const UserPost = (req, res) => {  //se encargara de manejar las solicitudes HTTP POST para crear una nueva carrera.
  
  let user = new User(); //se crea la estructura que va a la base de datos
  user.firstName = req.body.firstName;    
  user.Lastname = req.body.Lastname;
  user.email = req.body.email;
  user.password = req.body.password;
  user.address = req.body.address;
  user.country = req.body.country;
  user.state = req.body.state;
  user.city = req.body.city;
  user.phoneNumber = req.body.phoneNumber;
  user
    .save()  //se usa este metodo para cargar, haciendo que si se guarda la carrera exitosamente se ejecuta el bloque de codigo creando en json
    .then(() => {
        res.status(201); 
        res.header({
        location: `/api/user/?id=${user.id}`,
        });
        res.json(user);
    })
    .catch((err) => {  //si hubo algun error al crear la carrera en la consola se imprime el mensaje de error y a la bd va un json con mensaje de error
        res.status(422); //eror de solicitud
        console.log("error", err);
        res.json({
        error: "error",
        });
    });
    };

const UserGet = (req, res) => {
  if (req.query && req.query.id) { //el objeto tiene una propiedad id y Si es así, significa que el cliente está solicitando una carrera específica por su ID.
    User.findById(req.query.id) //buscar una carrera específica por su ID.
      .then((user) => { //Si se encuentra la carrera, se devuelve en formato JSON como respuesta.
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

const UserPut = async (req, res) => {
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
            return res.status(404).json({ error: "Career doesn't exist" }); //esto pasa si el ID no corresponde a ningun usuario
        }

        return res.status(200).json(updatedUser); // si todo sale bien devuelve el usuario editada en un formato json
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'error' });
    }
  }
};

async function userDelete(req, res) {
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
      console.error("Error while handling the career:", err);
      return res.status(500).json({ error: "There was an error processing the user" });
    }
  } else {
    // Si no se proporciona un ID da error
    return res.status(400).json({ error: "No ID provided" });
  }
};


/*const UserLogin = (req, res) => {
  const { email, password } = req.body;

  console.log('Intentando iniciar sesión para el usuario:', email);

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
          }

          jwt.sign(
            { id: user.id },
            'tuclaveSecreta',
            { expiresIn: '1h' },
            (err, token) => {
              if (err) {
                console.error('Error al generar el token:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
              }
              res.json({
                token,
                user: {
                  id: user.id,
                  firstName: user.firstName,
                  email: user.email
                }
              });
            }
          );
        })
        .catch(err => {
          console.error('Error al comparar contraseñas:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
        });
    })
    .catch(err => {
      console.error('Error al buscar usuario:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    });
};*/



    module.exports = {  //exporta las funciones
        UserPost,
        UserGet,
       
      };