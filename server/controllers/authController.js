const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const createError = require('../utils/appError');
const jwt = require('jsonwebtoken')

//REGISTER USER
exports.signup = async (req, res, next) => {
    try {
       const user = await User.findOne({email: req.body.email}) 

       if (user) {
            return next(new createError('User already exists!' , 400));
       }
       const hashedPassword = await bcrypt.hash(req.body.password, 12);

       const newUser = await User.create({
        ...req.body,
        password: hashedPassword,

       });

       //Assign JWT (json web token) to user
       const token = jwt.sign({ _id: newUser._id}, 'secretkey123', {
        expiresIn: '90d',
       });

       res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        token,
       });

    } catch (error) {
       next(error) 
    }
}

//LOGIN USER
exports.login = async (req, res, next) => {

}