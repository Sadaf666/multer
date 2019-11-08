const mongoose = require("mongoose");

const schema = mongoose.Schema;

const teamschema = new schema({
    team_logo: String,
    team_banner: String,
    team_name: {
        type: String,
        required: true
    },
    team_bio: String,
    team_request: Array,
    created_by: {
        type: String,
        ref: "user"
    },
    userName: String,
    registration: {
        type: Boolean,
        default:true
    }
})

const team = mongoose.model("team", teamschema);
module.exports = team;