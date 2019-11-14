const mongoose = require("mongoose");

const schema = mongoose.Schema;

const teamschema = new schema({
  team_logo: String,
  team_banner: String,
  team_name: {
    type: String,

  },
  team_bio: String,
  team_request: {
    type: Array
  },
  created_by: {
    type: String,
    ref: "user"
  },
  usname: String,
  registration: {
    type: Boolean,
    default: true
  }
});

const team = mongoose.model("team", teamschema);
module.exports = team;