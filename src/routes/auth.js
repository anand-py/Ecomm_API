const router = require("express").Router()
const authController = require("../controller/auth")
const {signupValidationRules} = require("../middleware/validator");

// Include the validation rules as middleware before your controller
router.post('/signup', signupValidationRules, authController.signup);
router.post("/login", authController.login)


module.exports = router;