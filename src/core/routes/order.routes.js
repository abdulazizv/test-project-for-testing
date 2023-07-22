const {Router} = require("express");
const { getAllOrder, createOrder, getOrderById, updateOrderById, deleteOrderById } = require("../service/order.service");

const router = Router();

router.get("/",getAllOrder);
router.post("/",createOrder);
router.get("/:id",getOrderById);
router.patch("/:id",updateOrderById);
router.delete("/:id",deleteOrderById);

module.exports = router;
