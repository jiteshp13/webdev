const mongoose = require("mongoose");

const Blog = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    blog: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId
    },
});

module.exports = mongoose.model("blog", Blog, "blog");
