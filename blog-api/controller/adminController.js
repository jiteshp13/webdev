const mongoose = require("mongoose");
const Admin = require("../models/Admin");

exports.signup = (req, res) => {
    let { firstName, lastName, email, password } = req.body;
    let admin = new Admin({ firstName, lastName, email, password });

    admin.save().then(() => {
        console.log(`Successfully created new admin: ${admin.firstName} ${admin.lastName}`);
        return res.status(200).send("New admin assigned");
    }).catch(() => {
        console.error("Error creating admin");
        res.status(500).send("Error creating admin");
    })
};

exports.login = (req, res) => {
    let { email, password } = req.body;
    Admin.findOne({ email: email, password: password})
    .then((userExists) => {
        if(userExists) {
            console.log(`Welcome back, ${email}`);
            return res.status(200).send("Admin successfully logged in");
        }
        console.log("Wrong username or password");
        return res.status(404).send("Admin not found");
    })
    .catch((error) => {
        console.error(error);
        return res.status(500).send(error);
    });
};
