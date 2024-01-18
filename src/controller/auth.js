const User = require("../model/user")
const bcrypt = require("bcrypt")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const Role = require("../model/role");
const { Op } = require("sequelize");





exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
        return res.status(400).json({ errors: extractedErrors });
    }

    // Search for a user with the provided email
    User.findOne({ where: { email: req.body.email } }).then((user) => {
        if (user) {
            const error = new Error("Email already Exists");
            error.statusCode = 403
            next(error)
            } else {
            bcrypt.hash(req.body.password, 12).then(hashedPassword => {

                    Role.findAll({
                        where: {
                            name: {
                                [Op.in]: req.body.roles
                            }
                        }
                    }).then((roles) => {
                        const user = new User();
                        User.create({

                                name: req.body.name,
                                email: req.body.email,
                                password: hashedPassword,
                            }).then((user) => {
                                user.setRoles(roles);
                                user.save().then((result)=>{
                                    return res.status(201).json({ message: "SignUp Successful" })
                                })
                            })
                       
                });
            });
        }
    }).catch((error) => {
        return res.status(500).json({ message: "Error accessing the database", error: error });
    });
};



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
                        userId: user.id,
                    }, "cat", { expiresIn: '1h' })
                    res.status(200).json({ message: "Login Successfull", toekn: token })
                } else {
                    res.status(404).json({ message: "Invalid Password" })
                }
            })
        }
    })
}
