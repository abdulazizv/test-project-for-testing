const { Router } = require("express");

const router = Router();

const employeeRouter = require("./employee.routes");
const hotelRouter = require("./hotel.routes");
const orderRouter = require("./order.routes");
const socialRouter = require("./social.routes");
const tourRouter = require("./tour.routes");
const uploadRouter = require("./upload.routes");

router.use("/api/upload",uploadRouter);
router.use("/api/employee", employeeRouter);
router.use("/api/hotel", hotelRouter);
router.use("/api/order", orderRouter);
router.use("/api/social", socialRouter);
router.use("/api/tour", tourRouter);

module.exports = router;
