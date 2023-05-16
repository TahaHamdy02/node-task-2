const {
  getAllUsersCtrl,
  getUserCtrl,
  updateUserCtrl,
  deleteUserCtrl,
  getAllUsersCountCtrl,
} = require("../controller/userController");

const router = require("express").Router();
router.get("/", getAllUsersCtrl);
router.get("/count", getAllUsersCountCtrl);
router
  .route("/profile/:id")
  .get(getUserCtrl)
  .put(updateUserCtrl)
  .delete(deleteUserCtrl);

module.exports = router;
