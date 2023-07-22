const { Router } = require("express");
const { registerSuperAdmin, loginSuperAdmin, registerUser, loginUser, createAdmin, loginAdmin, getAll, getUserById, updateUser, deleteUserById } = require("../service/employee.service");

const router = Router();

router.get("/",getAll)
router.post("/register/super-admin",registerSuperAdmin)
router.post("/login/super-admin",loginSuperAdmin)
router.post("/register/user",registerUser)
router.post("/login/user",loginUser)
router.post("/create/admin",createAdmin)
router.post("/login/admin",loginAdmin)
router.get("/:id",getUserById)
router.patch("/:id",updateUser)
router.delete("/:id",deleteUserById)

module.exports = router;