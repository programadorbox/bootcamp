// bootcamp.controller.js
const { users,bootcamps} = require('../../models/bootcamp')
const db = require('../../models')
const Bootcamp = db.bootcamps
const User = db.users

// Crear y guardar un nuevo bootcamp
exports.createBootcamp = (req, res) => {
  const { title, cue, description } = req.body;

  Bootcamp.create({ title, cue, description })
    .then(bootcamp => {
      console.log(`>> Creado el bootcamp: ${JSON.stringify(bootcamp, null, 4)}`);
      res.status(201).json(bootcamp);
    })
    .catch(err => {
      console.log(`>> Error al crear el bootcamp: ${err}`);
      res.status(500).json({ message: err.message });
    });
};

// Agregar un Usuario al Bootcamp
// bootcamp.controller.js

exports.addUserToBootcamp = (req, res) => {
  const { bootcampId, userId } = req.body;
  Bootcamp.findByPk(bootcampId)
    .then(bootcamp => {
      if (!bootcamp) {
        return res.status(404).json({ message: "No se encontró el Bootcamp!" });
      }
      return User.findByPk(userId).then(user => {
        if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado!" });
        }
        bootcamp.addUser(user);
        console.log(`Agregado el usuario id=${user.id} al bootcamp con id=${bootcamp.id}`);
        res.status(200).json({ message: "Usuario agregado al bootcamp" });
      });
    })
    .catch(err => {
      console.log(">> Error mientras se estaba agregando Usuario al Bootcamp", err);
      res.status(500).json({ message: err.message });
    });
};




// obtener los bootcamp por id 
exports.findById = (Id) => {
  return Bootcamp.findByPk(Id, {
      include: [{
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        }
      }, ],
    })
    .then(bootcamp => {
      return bootcamp
    })
    .catch(err => {
      console.log(`>> Error mientras se encontraba el bootcamp: ${err}`)
    })
}

// obtener todos los Usuarios incluyendo los Bootcamp
exports.findAll = () => {
  return Bootcamp.findAll({
    include: [{
      model: User,
      as: "users",
      attributes: ["id", "firstName", "lastName"],
      through: {
        attributes: [],
      }
    }, ],
  }).then(bootcamps => {
    return bootcamps
  }).catch((err) => {
    console.log(">> Error Buscando los Bootcamps: ", err);
  });
}

exports.getBootcampById = (req, res) => {
  const { id } = req.params;

  Bootcamp.findByPk(id, {
    include: [{
      model: User,
      as: "users",
      attributes: ["id", "firstName", "lastName"],
      through: { attributes: [] }
    }],
  })
    .then(bootcamp => {
      if (!bootcamp) {
        return res.status(404).json({ message: "Bootcamp no encontrado" });
      }
      res.json(bootcamp);
    })
    .catch(err => {
      console.log(`>> Error mientras se encontraba el bootcamp: ${err}`);
      res.status(500).json({ message: err.message });
    });
};

exports.getAllBootcamps = (req, res) => {
  Bootcamp.findAll({
    include: [{
      model: User,
      as: "users",
      attributes: ["id", "firstName", "lastName"],
      through: { attributes: [] }
    }],
  })
    .then(bootcamps => res.json(bootcamps))
    .catch(err => {
      console.log(">> Error Buscando los Bootcamps: ", err);
      res.status(500).json({ message: err.message });
    });
};

exports.updateBootcamp = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  Bootcamp.update(updatedData, { where: { id } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated === 0) {
        return res.status(404).json({ message: "Bootcamp no encontrado" });
      }
      res.json({ message: "Bootcamp actualizado con éxito" });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

exports.deleteBootcamp = (req, res) => {
  const { id } = req.params;

  Bootcamp.destroy({ where: { id } })
    .then(deletedCount => {
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Bootcamp no encontrado" });
      }
      res.json({ message: "Bootcamp eliminado con éxito" });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};
