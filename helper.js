const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("./secrets");

// let isLoggedIn = true;
// isAdmin cookie can be used to identify b/w user and admin 
module.exports.protectRoute = function (req, res, next) {
    if (req.cookies.login) {
        const token = req.cookies.login;
        const isVerified = jwt.verify(token, JWT_KEY);
        if (isVerified) {
            next();
        } else {
            return req.json({
                msg: "user not verified"
            })
        }
    } else {
        return res.json({
            msg: "operation not allowed"
        });
    }
}