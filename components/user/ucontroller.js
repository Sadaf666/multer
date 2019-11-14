const umodel = require("./umodel");
const bcrypt = require("bcryptjs");
let ucontroller = {};

ucontroller.register = async (req, res) => {
  try {
    console.log(req.file);

    let pass = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    let ob = {
      name: req.body.name,
      follower: req.body.follower,
      followed: req.body.followed,
      post: req.body.post,
      category: req.body.category,
      email_Address: req.body.emailaddress,
      password: pass
    };
    if (req.file) {
      ob.photo = req.file.filename;
    }

    let db = new umodel(ob);

    let data = await db.save();
    let token = await jwt.sign({
        email_Address: data.email_Address,
        id: data._id
      },
      "your secret"
    );

    console.log("User has been saved--->", data);

    return res.status(200).send({
      user: data,
      token
    });
  } catch (error) {
    return res.status(400).send({
      error: error.message
    });
  }
};

ucontroller.login = async (req, res) => {
  try {
    let log = await umodel.findOne({
      email_Address: req.body.emailaddress
    });
    if (
      log &&
      log.password &&
      bcrypt.compareSync(req.body.password, log.password)
    ) {
      return res.status(200).send({
        data: log
      });
    } else {
      return res.status(400).send("Password not match.");
    }
  } catch (error) {
    return res.status(400).send({
      error: error.message
    });
  }
};

ucontroller.login = async (req, res) => {
  try {
    let log = await umodel.findOne({
      email_Address: req.body.emailaddress
    });
    if (
      log &&
      log.password &&
      bcrypt.compareSync(req.body.password, log.password)
    ) {
      return res.status(200).send({
        data: log
      });
    } else {
      return res.status(400).send("Password not match.");
    }
  } catch (error) {
    return res.status(400).send({
      error: error.message
    });
  }
};

ucontroller.delete = async (req, res) => {
  try {
    let data = await umodel.remove({});
    res.status(200).send({
      "user collection in droped": data
    });
  } catch (error) {
    return res.status(400).send({
      error: error.message
    });
  }
};

module.exports = ucontroller;