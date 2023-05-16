const User = require('../models/user');
const jwt = require("jsonwebtoken");

// Get all users
exports.getUsers = (req, res, next) => {
  User.findAll()
    .then(users => {
      res.status(200).json({
        users: users
      });
    })
    .catch(err => console.log(err));
}

// Get user by id
exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found!'
        });
      }
      res.status(200).json({
        user: user
      });
    })
    .catch(err => console.log(err));
}

// Create user
exports.createUser = (req, res) => {
  const {
    name,
    email,
    password,
    avatar,
    level,
    weapon,
    armor,
    bag
  } = req.body;

  const userData = {
    name: name,
    email: email,
    password: password,
    avatar: avatar,
    level: level,
    weapon: weapon,
    armor: armor,
    bag: bag,
  }

  User.create(userData)
    .then(result => {
      res.status(201).json({
        message: 'User created successfully!',
        user: result
      });
    })
    .catch(err => {
      console.log(err);
    });
}

// Update user
exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  const updatedPassword = req.body.password;
  const updatedAvatar = req.body.avatar;
  const updatedLevel = req.body.level;
  const updatedWeapon = req.body.weapon;
  const updatedArmor = req.body.armor;
  const updatedBag = req.body.bag;
  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found!'
        });
      }
      user.name = updatedName;
      user.email = updatedEmail;
      user.password = updatedPassword;
      user.avatar = updatedAvatar;
      user.level = updatedLevel;
      user.weapon = updatedWeapon;
      user.armor = updatedArmor;
      user.bag = updatedBag;
      return user.save();
    })
    .then(result => {
      res.status(200).json({
        message: 'User updated!',
        user: result
      });
    })
    .catch(err => console.log(err));
}

// Delete user
exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found!'
        });
      }
      return User.destroy({
        where: {
          id: userId
        }
      });
    })
    .then(result => {
      res.status(200).json({
        message: 'User deleted!'
      });
    })
    .catch(err => console.log(err));
}

// Login
exports.login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user = await User.findOne({
      where: {
        email: email
      }
    });

    if (user) {
      const isSame = password == user.password;

      if (isSame) {
        let token = jwt.sign({
          id: user.id
        }, process.env.SECRET_KEY, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        res.cookie("jwt", token, {
          maxAge: 1 * 24 * 60 * 60,
          httpOnly: true
        });
        const result = {user: user, token: token}
        return res.status(201).send(result);
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
}