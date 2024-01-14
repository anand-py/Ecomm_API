const router = require("express").Router()
const productController = require("../controller/product")
const isAuth = require("../middleware/isAuth")

router.get("/products", productController.getProducts)
router.post("/product", isAuth, productController.createProduct)
router.get("/product/:id", productController.getProduct)
router.delete("/product/:id", isAuth, productController.deleteProduct)
router.put("/product/:id", isAuth, productController.updateProduct)


module.exports = router;