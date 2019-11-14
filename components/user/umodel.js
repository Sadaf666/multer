const mongoose = require("mongoose");
const schema = mongoose.Schema;


const userschema = new schema({
    photo: {
        type: String
    },
    name: String,
    follower: Number,
    followed: Number,
    post: Number,
    category: {
        type: Array
    },
    email_Address: {
        type: String
    },

    password: {
        type: String
    }
}, {
    timestamps: true

});

const user = mongoose.model("user", userschema);
module.exports = user;