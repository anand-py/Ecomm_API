const router = require("express").Router()
const categoryController = require("../controller/category")
const isAuth = require("../middleware/isAuth")
const isAuthorized = require("../middleware/isAuthorized")

router.get("/categories", categoryController.getCategories)
router.post("/category", isAuth, isAuthorized, categoryController.createCategory)
router.get("/category/:id", categoryController.getCategory)
router.delete("/category/:id", isAuth, isAuthorized, categoryController.deleteCategory)
router.put("/category/:id", isAuth, isAuthorized, categoryController.updateCategory)


module.exports = router;