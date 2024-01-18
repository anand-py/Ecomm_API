const User = require('../model/user');



// module.exports = async (req,res,next)=>{
//     const user = await User.findByPk(req.userId)
//     const roles = await user.getRoles();
//     for(const role of roles){
//         if(role.name == "admin"){
//         next();
//         return
//     }
//     }
//     return res.status(403).json({message : "Not Authorized"})
// }

module.exports = (req, res, next) => {
    User.findByPk(req.userId)
    .then((user) => user.getRoles())
    .then((roles) => { // Added arrow function here
        for (const role of roles) {
            if (role.name == "admin") {
                next();
                return;
            }
        }
        return res.status(403).json({ message: "Not Authorized" });
    })
    .catch(error => res.status(500).json({ message: "Server Error", error })); // Added error handling
}