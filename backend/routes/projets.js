const express = require("express");
const projetsCtrl= require("../controllers/projets")
const auth= require("../middlewares/auth");
const cloudinaryUploadMiddleware= require("../middlewares/multer-sharp");
const router= express.Router();


router.get("/:id", projetsCtrl.getProjet);

router.get("/", projetsCtrl.getList);

router.post("/", auth, cloudinaryUploadMiddleware, projetsCtrl.postProjet);

router.put("/:id", auth, cloudinaryUploadMiddleware, projetsCtrl.putProjet);

router.put("/simple/:id", auth, cloudinaryUploadMiddleware, projetsCtrl.putSimpleProjet );

router.delete("/:id", auth, projetsCtrl.deleteProjet);

module.exports = router;