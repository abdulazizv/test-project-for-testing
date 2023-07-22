const { Router } = require("express");
const { getAllSocial, getSocialById, createSocial, deleteSocialById, updateSocialById } = require("../service/social.service");

const router = Router();

router.get("/",getAllSocial);
router.post("/",createSocial);
router.get("/:id",getSocialById);
router.delete("/:id",deleteSocialById);
router.patch("/:id",updateSocialById)

module.exports = router;