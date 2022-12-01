const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModel");

userRouter
    .route("/")
    .get(protectRoute, getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);

userRouter.route("/setcookies").get(setCookies);

userRouter.route("/getcookies").get(getCookies);

userRouter.route("/:name").get(getUserById);

// let isLoggedIn = true;
// isAdmin cookie can be used to identify b/w user and admin 
function protectRoute(req, res, next) {
    if (req.cookies.isLoggedIn) {
        next();
    } else {
        return res.json({
            msg: "operation not allowed"
        });
    }
}

async function getUsers(req, res) {
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

function postUser(req, res) {
    console.log(req.body.Name);
    //then i can put this in db
    user.push(req.body);
    res.json({
        message: "Data received successfully",
        user: req.body,
    });
}

async function updateUser(req, res) {
    try {
        console.log(req.body);
        let dataToBeUpdated = req.body;
        // for (key in dataToBeUpdated) {
        //     user[key] = dataToBeUpdated[key];
        // }
        let doc = await userModel.findOneAndUpdate(
            { email: "abc@gmail.com" },
            dataToBeUpdated
        );
        res.json({
            message: "data updated succesfully",
        });
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
}

async function deleteUser(req, res) {
    try {
        // user = {};
        let doc = await userModel.deleteOne({ email: "abcd@gmail.com" });
        console.log(doc);
        res.json({
            msg: "user has been deleted",
        });
    } catch (error) { }
}

function getUserById(req, res) {
    console.log(req.params.name);
    //let {id}=req.params;
    // let user = db.findOne(id);
    res.json({ msg: "user id is ", obj: req.params });
}

function setCookies(req, res) {
    // res.setHeader("Set-Cookie", "isLoggedIn=true");
    res.cookie("isLogginIn", true, { maxAge: 30000 });
    res.cookie("password", 123456789, { maxAge: 30000 });
    res.send("cookies have been set");
}

function getCookies(req, res) {
    let cookie = req.cookies;
    console.log(cookie);
    res.send("cookies recieved.");
}

module.exports = userRouter;