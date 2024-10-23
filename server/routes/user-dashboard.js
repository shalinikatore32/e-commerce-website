const express = require('express');
const authMiddleware = require('../controller/authmiddleware');
const bcrypt = require('bcrypt');
const userDashRoute = express.Router();
const userModel = require('../models/user-model');

userDashRoute.route('/user/:id').get(authMiddleware, async (req, res, next) => {
    try {
        const id = req.params.id;
        const getUser = await userModel.findOne({_id: id});
        res.status(200).json({getUser});
    } catch (error) {
        next(error);
    }
});

userDashRoute.route('/user/update-pass/:id').patch(authMiddleware, async (req, res, next) => { // Changed to POST method
    try {
        const id = req.params.id;
        const { password } = req.body; // Assuming password is sent in the request body

        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const updatePass = await userModel.updateOne(
            {_id:id},{ $set: { password: hashedPassword } }
        );

        res.status(200).json({ updatePass });
    } catch (error) {
        next(error);
    }
});

module.exports = userDashRoute;
