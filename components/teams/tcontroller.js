const tmodel = require("../teams/tmodel");
const umodel = require("../user/umodel")
const tcontroller = {};

tcontroller.create = async (req, res) => {
    try {
        let ob = {
            team_logo: req.body.teamlogo,
            team_banner: req.body.teambanner,
            team_name: req.body.teamname,
            team_bio: req.body.teambio,
            created_by: req.body.createdBy,
            userName: req.body.username
        }

        let db = new tmodel(ob);

        let data = await db.save();

        console.log("Team has been saved--->", data)

        res.status(200).send({
            Team: data
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        })
    }


}

tcontroller.teamList = async (req, res) => {
    try {

        let data = await tmodel.find({}, "team_name").populate("created_by", "name follower followed post")

        console.log("Team :-", data)

        res.status(200).send({
            Team: data
        })
    } catch (error) {
        res.status(400).send({
            error: error.message
        })

    }
}

tcontroller.teamsearch = async (req, res) => {
    try {
        let data = await tmodel.find({
            team_name: req.body.teamname
        });
        console.log("teams", data);

        res.status(200).send({
            team: data
        })
    } catch (error) {
        console.log("error", error);

        res.status(400).send({
            error: error.message
        })
    }
}

tcontroller.userteams = async (req, res) => {
    try {

        let data = await tmodel.find({
            userName: req.body.username
        })
        if (data) {
            console.log(data);

            res.status(200).send({
                teams: data
            })
        } else {
            console.log("not found");

            res.status(200).send("not found")
        }


    } catch (error) {
        console.log("error", error)
        res.status(400).send({
            error: error.message
        })
    }
}

tcontroller.topteams = async (req, res) => {
    try {
        let data = await umodel.find({}).populate("team", "team_name").sort({
            follower: -1
        }).limit(3)
        res.status(200).send({
            teams: data
        })
    } catch (error) {
        console.log("error", error)
        res.status(400).send({
            error: error.message
        })
    }
}

tcontroller.recent = async (req, res) => {
    try {
        let data = await tmodel.find({}).sort({
            createdAt: -1
        }).limit(3);
        console.log("teams", data);

        res.status(200).send({
            "recent teams are": data
        })
    } catch (error) {
        console.log("error", error)
        res.status(400).send({
            error: error.message
        })
    }
}

tcontroller.delete = async (req, res) => {
    try {
        let data = await tmodel.remove({})
        res.status(200).send({
            "teams collection is droped": data
        })
    } catch (error) {
        return res.status(400).send({
            error: error.message
        })
    }
}

tcontroller.registrationclose = async (req, res) => {
    try {
        let data = await tmodel.findAndUpdate({
            userName: req.body.username
        },{$set:{registration:false}})
       
            res.status(200).send({
                registration: data
            })
    } catch (error) {
        return res.status(400).send({
            error: error.message
        })
    }
}

module.exports = tcontroller;