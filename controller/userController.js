const userModel = require("../models/userModel");

module.exports.getUser = async function (req, res) {
    console.log(req.query);
    let { name, age } = req.query;
    // let filteredData=user.filter(userObj => {
    //     return (userObj.name==name && userObj.age==age)
    // })
    // res.send(filteredData);

    //get all users from db
    let allUsers = await userModel.find();

    res.json({ msg: "users retrieved", allUsers });
    // console.log("getUser called ");
    // next();
}

module.exports.postUser = function (req, res) {
    console.log(req.body.Name);
    //then i can put this in db
    user.push(req.body);
    res.json({
        message: "Data received successfully",
        user: req.body,
    });
}

module.exports.updateUser = async function (req, res) {
    try {
        console.log(req.body);
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let user = await userModel.findById(id);
        if (user) {
            const keys = [];  // ["name", "email"]
            for(let key in dataToBeUpdated) {
                keys.push(key);
            }
            for(let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }

            const updatedUser = await user.save();

            res.json({
                message: "data updated succesfully",
                updatedUser
            });
        } else {
            res.json({
                message: "user not found",
            });
        }
        
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
}

module.exports.deleteUser = async function (req, res) {
    try {
        // user = {};
        let doc = await userModel.deleteOne({ email: "abcd@gmail.com" });
        console.log(doc);
        res.json({
            msg: "user has been deleted",
        });
    } catch (error) { }
}

module.exports.getUserById = function (req, res) {
    console.log(req.params.name);
    //let {id}=req.params;
    // let user = db.findOne(id);
    res.json({ msg: "user id is ", obj: req.params });
}

module.exports.setCookies = function (req, res) {
    // res.setHeader("Set-Cookie", "isLoggedIn=true");
    res.cookie("isLogginIn", true, { maxAge: 30000 });
    res.cookie("password", 123456789, { maxAge: 30000 });
    res.send("cookies have been set");
}

module.exports.getCookies = function (req, res) {
    let cookie = req.cookies;
    console.log(cookie);
    res.send("cookies recieved.");
}