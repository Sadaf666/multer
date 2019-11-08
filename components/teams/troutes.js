const express = require("express");
const router = express.Router();
const controller = require("./tcontroller");

router.post("/create", controller.create);
router.get("/teamList", controller.teamList);
router.get("/teamsearch", controller.teamsearch);
router.get("/userteams", controller.userteams);
router.get("/recent", controller.recent);
router.get("/topteams", controller.topteams);
router.delete("/delete",controller.delete);
router.put("/registrationclose",controller.registrationclose);


module.exports = router;