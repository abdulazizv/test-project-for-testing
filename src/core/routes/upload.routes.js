const {Router} = require("express");
const { uploadImages } = require("../service/upload.service");
const { fileUpload } = require("../../utils/uploads/FileService");


const router = Router();

router.post("/",fileUpload.array('images'),uploadImages);

module.exports = router;