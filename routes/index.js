const user = require("../components/user/uroutes");
const team = require("../components/teams/troutes");
module.exports = function (app) {
    app.use("/user", user)
    app.use("/team", team)
}