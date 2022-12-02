
const bcrpyt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = require("../secrets");

module.exports.getSignUp = function (req, res) {
    res.sendFile("/public/index.html", { root: __dirname });
}

module.exports.postSignUp = async function (req, res) {
    // let { email, name, password } = req.body;
    try {
        let data = req.body;
        let user = await userModel.create(data);
        console.log(data);
        res.json({
            msg: "user signed up",
            user,
        });
    } catch (err) {
        res.json({
            err: err.message,
        });
    }
}

module.exports.loginUser = async function (req, res) {
    try {
        let { email, password} = req.body;
        let user = await userModel.findOne({ email });
        if (user) {
            // check if password matches
            // bcrpyt -> used to check password
            const isRegisteredUser = bcrpyt.compare(password, user.password);
            if (isRegisteredUser) {
                const uid = user["_id"];
                const token = jwt.sign({ payload: uid }, JWT_KEY)
                res.cookie("login", token);
                res.json({
                    msg: "user loggin in",
                })
            } else {
                res.json({
                    msg: "wrong credentials",
                })
            }
        } else {
            res.json({ msg: "user not found"});
        }
    } catch (error) {
        console.log(error.message);
        res.json({
            msg: error.message,
        })
    }
}
