const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost:27017/dance1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    /*connection set to mongodb*/
    if (err) {
        console.log("Problem in connecting to mongoDB", err);
    } else {
        console.log("Connection successfull to mongoDB");
    }
});

app.get("/", (req, res) => res.send("Server has been started.."));

let route = require("./routes")(app);
app.listen(port, () => console.log(`App listening on ${port}`));