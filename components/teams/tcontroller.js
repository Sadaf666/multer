const tmodel = require("../teams/tmodel");
const umodel = require("../user/umodel");
const tcontroller = {};

tcontroller.create = async (req, res) => {
    try {


        let ob = {
            team_name: req.body.teamname,
            team_bio: req.body.teambio,
            usname: req.body.username,
            created_by: req.body.createdby,
            // team_logo: req.files[0].filename,
            // team_banner: req.files[1].filename
        };

        if (req.files) {
            ob.team_logo = req.files[0].filename,
                ob.team_banner = req.files[1].filename

        }

        let db = new tmodel(ob);

        let data = await db.save();
        res.status(200).send({
            Team: data
        });


    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
};

tcontroller.teamList = async (req, res) => {
    try {
        let data = await tmodel
            .find({}, "team_name")
            .populate("created_by", "name follower followed post");

        console.log("Team :-", data);

        res.status(200).send({
            Team: data
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
};

tcontroller.teamsearch = async (req, res) => {
    try {
        let data = await tmodel.find({
            team_name: req.body.teamname
        });
        console.log("teams", data);

        res.status(200).send({
            team: data
        });
    } catch (error) {
        console.log("error", error);

        res.status(400).send({
            error: error.message
        });
    }
};

tcontroller.userteams = async (req, res) => {
    try {
        let data = await tmodel.find({
            userName: req.body.username
        });
        if (data) {
            console.log(data);

            res.status(200).send({
                teams: data
            });
        } else {
            console.log("not found");

            res.status(200).send("not found");
        }
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            error: error.message
        });
    }
};

tcontroller.topteams = async (req, res) => {
    try {
        let data = await umodel
            .find({})
            .populate("team", "team_name")
            .sort({
                follower: -1
            })
            .limit(3);
        res.status(200).send({
            teams: data
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            error: error.message
        });
    }
};

tcontroller.recent = async (req, res) => {
    try {
        let data = await tmodel
            .find({})
            .sort({
                createdAt: -1
            })
            .limit(3);
        console.log("teams", data);

        res.status(200).send({
            "recent teams are": data
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).send({
            error: error.message
        });
    }
};

tcontroller.delete = async (req, res) => {
    try {
        let data = await tmodel.remove({});
        res.status(200).send({
            "teams collection is droped": data
        });
    } catch (error) {
        return res.status(400).send({
            error: error.message
        });
    }
};

tcontroller.registrationclose = async (req, res) => {
    try {
        let data = await tmodel.findOneAndUpdate({
            userName: req.body.username
        }, {
            $set: {
                registration: false
            }
        }, {
            new: true
        });

        res.status(200).send({
            registration: data
        });
    } catch (error) {
        return res.status(400).send({
            error: error.message
        });
    }
};

tcontroller.updateandedit = async (req, res) => {
    try {
        let admin = await tmodel.findOneAndUpdate({
            userName: req.body.username
        }, {
            $set: {
                team_name: req.body.teamname,
                team_bio: req.body.team_bio,
                team_logo: req.file.filename,
                team_banner: req.file.filename,
                userName: req.body.username
            }
        });
        console.log("the edited team is", admin);
        res.status(200).send({
            data: admin
        });
    } catch (error) {
        console.log("error", error);
        res.status(404).send({
            error: error.message
        });
    }
};

tcontroller.deleteuser = async (req, res) => {
    try {
        let admin = await tmodel.findOneAndRemove({
            userName: req.body.username
        });
        res.status(200).send({
            data: admin
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            error: error.message
        });
    }
};
module.exports = tcontroller;