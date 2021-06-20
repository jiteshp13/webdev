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
