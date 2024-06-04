const pool = require('./pool');


//Used to ensure admin rights are only granted if the database matches the user request. 
//This helps to secure the admin routes from breaches
const checkAdminAuth = async (req, res, next) => {
    if (req.user.is_admin) {
        return next();
    } else if (!req.user.is_admin) {
        res.SendStatus(403).send().json({ message: "User not authorized" })
    }
};

module.exports = checkAdminAuth;