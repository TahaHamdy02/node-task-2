const router = require("express").Router();
router.use("/auth", require("./authRoute"));
router.use("/user", require("./userRoute"));
router.use("/post", require("./postRoute"));

module.exports = router;
