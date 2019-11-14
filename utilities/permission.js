const jwt = require("jsonwebtoken")

exports.decodeToken = async (req, res,callback) => {
    const token = req.header("authorization");
    if (token != "" && token != undefined) {
        try {
            const result = jwt.verify(token, "your secret");
            req.body.decodedToken = result;
             callback();
        } catch (error) {
            res.status(401).send({
                error: "Authorization failed.",
                _error: error
            });
        }
    } else
        res.status(401).send({
            error: "'idToken' field is required"
        });
};

