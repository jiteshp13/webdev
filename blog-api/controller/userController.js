const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const User = require("../models/User");
const Blog = require("../models/Blog");

exports.signup = (req, res) => {
  let { firstName, lastName, email, password, dob } = req.body;
  let user = new User({ firstName, lastName, email, password, dob });

  user
    .save()
    .then(() => {
      console.log(`Successfully created new user: ${firstName} ${lastName}`);
      return res.status(200).send(`New user created: ${firstName} ${lastName}`);
    })
    .catch((error) => {
      console.error("Error creating user", error);
      return res.status(500).send("Error creating user");
    });
};

exports.login = (req, res) => {
  let { email, password } = req.body;
  User.findOne({ email: email, password: password })
    .then((userExists) => {
      if (userExists) {
        console.log(`Welcome back, ${email}`);
        return res.status(200).send(`Welcome back, ${email}`);
      }
      console.log("Wrong username or password");
      return res.status(404).send("Wrong username or password");
    })
    .catch((error) => {
      console.error(error);
      return res.send(500).send("Error logging in");
    });
};

exports.getUser = (req, res) => {
  let id = req.params.id;
  id = mongoose.Types.ObjectId(id);

  User.findOne({ _id: id })
    .then((userExists) => {
      if (userExists) {
        console.log(
          `User found: ${userExists.firstName} ${userExists.lastName}`
        );
        return res
          .status(200)
          .send(`User found: ${userExists.firstName} ${userExists.lastName}`);
      }
      console.error(`User ${id} does not exists`);
      return res.status(404).send(`User ${id} does not exists`);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send("Error finding user");
    });
};

let PORT = 7000;

exports.postBlog = (req, res) => {
  let { heading, blog, userId } = req.body;
  let newBlog = new Blog({ heading, blog, userId });

  // check if user has an account
  axios
    .get(`http://localhost:${PORT}/user/getUser/${userId}`)
    .then((response) => {
      // POST a blog is user has an account
      if (response.status === 200) {
        let author = response.data.slice(12);
        newBlog
          .save()
          .then(() => {
            console.log(`Hurray! Your blog has been posted ${author}`);
            return res
              .status(200)
              .send(`Hurray! Your blog has been posted ${author}.`);
          })
          .catch((error) => {
            console.log("Error while posting the blog", error);
            return res.status(500).send("Error while posting the blog");
          });
      }
    })
    .catch((error) => {
      console.error(`Sign up to post blogs @${userId}`);
      return res.status(401).send(`Sign up to post blogs @${userId}`);
    });
};

exports.getBlog = (req, res) => {
  let userId = req.params.id;
  userId = mongoose.Types.ObjectId(userId);

  Blog.findOne({ userId: userId })
    .then((userExists) => {
      if (userExists) {
        console.log(`User @${userId} has posted blogs`);
        return res.status(200).send(`User @${userId} has posted blogs`);
      }
      console.error(`No blog exists of user @${userId}`);
      return res.status(404).send(`No blog exists of user @${userId}`);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send(error);
    });
};
