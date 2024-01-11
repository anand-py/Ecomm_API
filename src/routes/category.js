const router = require("express").Router()
const categoryController = require("../controller/category")

router.get("/categories", categoryController.getCategories);

router.post

module.exports = router;