const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  getProfile,
  updateProfile,
  deleteProfile
} = require("../controllers/user.controller");

router.get("/", auth, getProfile);
router.put("/", auth, updateProfile);
router.delete("/", auth, deleteProfile);

module.exports = router;
