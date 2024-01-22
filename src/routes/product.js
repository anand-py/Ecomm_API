const router = require("express").Router()

const isAuth = require("../middleware/isAuth");
const isAuthorized = require("../middleware/isAuthorized");
const { productValidationRules } = require("../middleware/validator")


const productController = require("../controller/product")


router.get("/products", productController.getProducts)
router.post("/product", isAuth, isAuthorized, productValidationRules, productController.createProduct)
router.get("/product/:id", productController.getProduct)
router.delete("/product/:id", isAuth, isAuthorized, productController.deleteProduct)
router.put("/product/:id", isAuth, isAuthorized, productController.updateProduct)


/* `module.exports = router;` is exporting the `router` object so that it can be used in other files.
When a file is required/imported in another file, the exported value is returned. In this case, the
`router` object is being exported so that it can be used in the main application file to define the
routes. */
module.exports = router;