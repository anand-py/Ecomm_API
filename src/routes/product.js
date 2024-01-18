const router = require("express").Router()
const productController = require("../controller/product")
const isAuth = require("../middleware/isAuth");
const isAuthorized = require("../middleware/isAuthorized");
const {productValidationRules} = require("../middleware/validator")


router.get("/products", productController.getProducts)
router.post("/product", isAuth, isAuthorized, productValidationRules ,productController.createProduct)
router.get("/product/:id", productController.getProduct)
router.delete("/product/:id", isAuth, isAuthorized, productController.deleteProduct)
router.put("/product/:id", isAuth, isAuthorized, productController.updateProduct)


module.exports = router;