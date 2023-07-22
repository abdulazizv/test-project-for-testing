const { Router } = require("express");
const { getAllTours, createTour, getTourById, updateTourById, deleteTourById } = require("../service/tour.service");

const router = Router();

router.get("/",getAllTours);
router.post("/",createTour);
router.get("/:id",getTourById);
router.patch("/:id",updateTourById);
router.delete("/:id",deleteTourById)

module.exports = router;