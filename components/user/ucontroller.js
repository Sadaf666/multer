const umodel = require("./umodel");
let ucontroller = {};

ucontroller.register = async (req, res) => {
    try {
        console.log(req.file)

        let ob = {

            name: req.body.name,
            follower: req.body.follower,
            followed: req.body.followed,
            post: req.body.post,
            category: req.body.category
        }
        if (req.file) {
            ob.photo = req.file.filename
        }

        let db = new umodel(ob);

        let data = await db.save();
        console.log("User has been saved--->", data)
        return res.status(200).send({
            user: data
        })
    } catch (error) {
        return res.status(400).send({
            error: error.message
        })
    }
}

ucontroller.delete = async (req, res) => {
    try {
        let data = await umodel.remove({});
        res.status(200).send({
            "user collection in droped": data
        })
    } catch (error) {
        return res.status(400).send({
            error: error.message
        })
    }
}

module.exports = ucontroller;