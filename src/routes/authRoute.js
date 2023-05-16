const {
  registerUserCtrl,
  loginUserCtrl,
  logoutUserCtrl,
} = require("../controller/authController");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.post("/register", registerUserCtrl);
router.post("/login", loginUserCtrl);
router.post("/logout", verifyToken, logoutUserCtrl);

module.exports = router;
