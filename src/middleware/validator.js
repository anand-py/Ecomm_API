const { body } = require('express-validator');

const signupValidationRules = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 , max : 10})
  ];


const productValidationRules = [
    body('name').not().isEmpty().withMessage("Name can't be empty"),
   
  ];

module.exports = {signupValidationRules, productValidationRules};