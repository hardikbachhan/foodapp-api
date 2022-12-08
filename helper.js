const jwt = require("jsonwebtoken");
const userModel = require("./models/userModel");
const { JWT_KEY } = require("./secrets");

// isAuthorised -> check the user's role
// Client will send role key in req obj
module.exports.isAuthorised = function(roles) {
    return function(req, res, next) {
        let role = req.role;
        if (roles.includes(role)) {
            next();
        } else {
            res.status(401).json({
                msg: "role invalid",
            })
        }
    }
}

// protectRoute
// let isLoggedIn = true;
// isAdmin cookie can be used to identify b/w user and admin 
module.exports.protectRoute = async function (req, res, next) {
    let token;
    if (req.cookies.login) {
        token = req.cookies.login;
        const payload = jwt.verify(token, JWT_KEY);
        if (payload) {
            const user = await userModel.findById(payload.payload);
            if (user) {
                req.id = user.id;
                req.role = user.role;
                next();
            } else {
                res.json({
                    msg: "invalid request"
                })
            }
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