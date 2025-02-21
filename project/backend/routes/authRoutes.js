const express = require("express");
const { registerUser, loginUser, getUsers, getUserById , updateUserProfile , upload } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", upload.single('profilePic'), updateUserProfile);

module.exports = router;