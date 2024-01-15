const User = require("../model/user")
const bcrypt = require("bcrypt")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")

exports.signup = (req, res, next) => {
    // let errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     errors = errors.array();
    //     if(errors[0].param == "email"){
    //         return res.status(400).json({message : "Invalid Email"})
    //     }else if(errors[0].param == "password"){
    //         return res.status(400).json({message : "Password should have min 5 length"})
    //     }
    // }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
        return res.status(400).json({ errors: extractedErrors });
    }

    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then((user) => {
        if (user) {
            res.status(403).json({ message: "Email already Exists" })
        } else {
            bcrypt.hash(req.body.password, 12).then(hashedPassword => {
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                }).then((result) => {
                    res.status(201).json({ message: result, })
                });
            })
        }
    })

}



exports.login = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email,
        }
    }).then((user) => {
        if (!user) {
            res.status(404).json({ message: "Email not found" })
        } else {
            bcrypt.compare(req.body.password, user.password).then(isMatch => {
                if (isMatch) {
                    const token = jwt.sign({
                        name: user.name,
                        id: user.id,
                    }, "cat", { expiresIn: '1h' })
                    res.status(200).json({ message: "Login Successfull", toekn: token })
                } else {
                    res.status(404).json({ message: "Invalid Password" })
                }
            })
        }
    })
}


