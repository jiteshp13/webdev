const express = require("express");
const User = require("../models/User");

exports.signup = (req, res) => {
    let { firstName, lastName, email, password, dob } = req.body;
    let user = new User({ firstName, lastName, email, password, dob });

    user.save().then(() => {
        console.log(`Successfully created new user: ${firstName} ${lastName}`);
        return res.status(200).send("New user created");
    }).catch((error) => {
        console.error("Error creating user", error);
        return res.status(500).send("Error creating user");
    })
};

exports.login = (req, res) => {
    let { email, password } = req.body;
    User.findOne({ email: email, password: password })
    .then((userExists) => {
        if(userExists) {
            console.log(`Welcome back, ${email}`);
            return res.status(200).send("User successfully logged in");
        }
        console.log("Wrong username or password");
        return res.status(404).send("User not found");
    })
    .catch((error) => {
        console.error(error);
        return res.send(500).send(error);
    });
};
