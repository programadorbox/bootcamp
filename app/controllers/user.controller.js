
const db = require('../../models');
const User = db.users;
const Bootcamp = db.bootcamps;
const bcrypt = require('bcrypt');

// Crear y Guardar Usuarios
exports.createUser = async (req, res) => {
  const user = req.body;
  const passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!passwordRegex.test(user.password)) {
    return res.status(400).send({ message: 'La contraseña debe tener al menos 8 caracteres' });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);

  User.create({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: hashedPassword
  })
    .then(user => {
      console.log(`>> Se ha creado el usuario: ${JSON.stringify(user, null, 4)}`);
      res.status(201).send(user);
    })
    .catch(err => {
      console.log(`>> Error al crear el usuario: ${err}`);
      res.status(500).send({ message: err.message });
    });
};


// Obtener los bootcamp de un usuario
exports.getUserById = (req, res) => {
  const userId = req.params.id;

  User.findByPk(userId, {
    include: [{
      model: Bootcamp,
      as: "bootcamps",
      attributes: ["id", "title"],
      through: {
        attributes: [],
      }
    }],
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      res.send(user);
    })
    .catch(err => {
      console.log(`>> Error mientras se encontraba el usuario: ${err}`);
      res.status(500).send({ message: err.message });
    });
};

// Obtener todos los Usuarios incluyendo los bootcamp
exports.findAll = () => {
  return User.findAll({
    include: [{
      model: Bootcamp,
      as: "bootcamps",
      attributes: ["id", "title"],
      through: {
        attributes: [],
      }
    }],
  }).then(users => {
    return users;
  });
};

// Actualizar usuarios
exports.updateUserById = (userId, updatedData) => {
  return User.update(updatedData, {
    where: {
      id: userId
    }
  })
    .then(user => {
      console.log(`>> Se ha actualizado el usuario: ${JSON.stringify(user, null, 4)}`);
      return user;
    })
    .catch(err => {
      console.log(`>> Error mientras se actualizaba el usuario: ${err}`);
    });
};

// Eliminar usuario por ID
// user.controller.js
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  User.destroy({ where: { id: userId } })
    .then(deletedCount => {
      if (deletedCount === 0) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      res.send({ message: 'Usuario eliminado con éxito' });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


// Actualizar usuario (ejemplo de uso de req y res)
exports.updateUser  = (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  User.update(updatedData, { where: { id: userId } })
    .then(([rowsUpdate]) => {
      if (rowsUpdate === 0) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      res.send({ message: 'Usuario actualizado con éxito' });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  };
    