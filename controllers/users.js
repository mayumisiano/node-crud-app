const User = require('../models/user');

//CRUD Controllers

//Get All users
exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.status(200).json({ users: users });
        })
        .catch(err => console.log(err));
}

//Get user by id
exports.getUser = (req, res, next) => {
    const userid = req.params.userId;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'user not found!'})
            }
            res.status(200).json({ user:user });
        })
        .catch(err => console.log(err));
}

//Create user
exports.createuser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    User.create({
        name: name,
        email: email
    })
    .then(result => {
        console.log('Created user');
        res.status(201).json({
            message:'User create successfully!',
            user: result
        });
    })
    .catch(err => {
        console.log(err);
    })
}

//Update users
exports.updateUser = (req, rest, next) => {
    const userId = req.params.userId;
    const updatedName = req.body.name;
    const updatedEmail = req.body.email;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'user not found!'});
            }
            user.name = updatedName;
            user.email= updatedEmail;
            return user.save()
        })
        .then(result => {
            rest.status(200).json({ message: 'user updated!'})
        })
        .catch(err => console.log(err));
}

//Delete user
exports.deleteUser = (req, res, next)=> {
    const userId = req.params.userId;
    User.findByPk(userId)
    .then(user => {
        if (!user) {
            return res.status(400).json({ message: 'user not found'});
        }
        return User.destroy({
            where: {
                id: userId
            }
        });
    })
    .then(result => {
        res.status(200).json({message: 'User deleted!'});
    })
    .catch(err => console.log(err))
}