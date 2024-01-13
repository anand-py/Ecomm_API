const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = (req,res,next)=>{
    User.findOne({
        where: {
            email : req.body.email,
        },
    }).then((user)=>{
        if(user){
            res.status(403). json({message : "Email already Exists"})
        }else{
            bcrypt.hash(req.body.password, 12).then(hashedPassword=>{
                User.create({
                    name  : req.body.name,
                    email : req.body.email,
                    password : hashedPassword,
                }).then((result)=>{
                    res.status(201).json({message : result,})
                });
            })
        }
    })
    
}



exports.login = (req,res,next)=>{
    User.findOne({
        where :{
        email  : req.body.email,}
    }).then((user)=>{
        if(!user){
            res.status(404).json({message : "Email not found"})
        }else{
            bcrypt.compare(req.body.password, user.password).then(isMatch=>{
                if(isMatch){
                    const token = jwt.sign({
                        name : user.name,
                        id : user.id,
                    }, "cat", {expiresIn : '1h'})
                    res.status(200).json({message : "Login Successfull",toekn: token})
                }else{
                    res.status(404).json({message : "Invalid Password"})
                }
            })
        }
    })
}


