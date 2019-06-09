const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Function that creates a new user account and hashes the password 
exports.user_signup = (req, res, next) => {

    User.find({email: req.body.email})
        .exec()
        .then(user => {

            if (user.length >= 1) {
                return res.status(409).json({ message: 'Mail exists' });
            } else {

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json(err);
                    } else {
            
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                        .then(result => {
            
                            console.log(result);
                            res.status(201).json({ message: 'User created' });
                        })
                        .catch(err => {
            
                            console.log(err);
                            res.status(500).json(err);
                        });
                    }
            
                });
            }
        })
        .catch()
}

// Function that validates the given email and password and then
// returns an authentication token for future request validation
exports.user_login = (req, res, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then(user => {

            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed1'
                });
            }

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed2'
                    });
                }

                if (result) {

                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        });

                        return res.status(200).json({
                            message: 'Auth succesful',
                            token
                        });

                }

                res.status(401).json({
                    message: 'Auth failed3'
                });
            });
        })
        .catch(err => {
            
            console.log(err);
            res.status(500).json(err);
        });
}

// Function that deletes a user if given valid user id
exports.user_delete = (req, res, next) => {

    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({ message: 'User deleted' })
        })
        .catch(err => {
            
            console.log(err);
            res.status(500).json(err);
        });
}