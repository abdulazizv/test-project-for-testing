const {Router} = require('express');
const { getAllHotel, getHotelById, createHotel, updateHotelById, deleteHotelById } = require('../service/hotel.service');

const router = Router();

router.get("/",getAllHotel)
router.post("/",createHotel)
router.get("/:id",getHotelById)
router.patch("/:id",updateHotelById)
router.delete("/:id",deleteHotelById)

module.exports = router;