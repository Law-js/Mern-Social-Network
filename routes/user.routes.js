const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();

// AUTH
////////

// Sign Up
router.post("/register", authController.signUp);

// Sign In (jwt)
router.post("/login", authController.signIn);

// logout
router.get("/logout", authController.logout);

// USER DB
///////////

// get
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);

// put
router.put("/:id", userController.updateUser);

// delete
router.delete("/:id", userController.deleteUser);

// patch => mettre a jour un tableau dans un user
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

// upload (img)
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
