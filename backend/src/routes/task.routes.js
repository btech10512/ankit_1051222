const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/task.controller");

router.use(auth);
router.post("/", controller.createTask);
router.get("/", controller.getTasks);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

module.exports = router;
