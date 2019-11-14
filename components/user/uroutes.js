const express = require("express");
const router = express.Router();
const controller = require("./ucontroller");
const upload=require("../../utilities/multer");

router.post("/register",upload.single("photo"), controller.register);
router.post("/login",controller.login);
router.delete("/delete",controller.delete);

module.exports = router;