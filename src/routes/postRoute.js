const { createPostCtrl } = require("../controller/postController");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.post("/", verifyToken, createPostCtrl);

module.exports = router;
