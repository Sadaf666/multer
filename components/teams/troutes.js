const express = require("express");
const router = express.Router();
const controller = require("./tcontroller");
const upload = require("../../utilities/multer");

router.post("/create", upload.array("team_logo"), controller.create);
router.get("/teamList", controller.teamList);
router.get("/teamsearch", controller.teamsearch);
router.get("/userteams", controller.userteams);
router.get("/recent", controller.recent);
router.get("/topteams", controller.topteams);
router.delete("/delete", controller.delete);
router.put("/registrationclose", controller.registrationclose);
router.put(
    "/updateandedit",
    upload.single("team_logo"),
    controller.updateandedit
);
router.delete("/deleteuser", controller.deleteuser);

module.exports = router;