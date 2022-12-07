const express = require("express");
const userRouter = express.Router();
const { getUser, updateUser, deleteUser, getAllUsers } = require("../controller/userController");
const { signup, login } = require("../controller/authController");
const { protectRoute, isAuthorised } = require("../helper");

// user ke options
userRouter
    .route("/:id")
    .patch(updateUser)
    .delete(deleteUser);

userRouter
    .route("/login")
    .post(login);

userRouter
    .route("/signup")
    .post(signup);
    
// profile page
userRouter.use(protectRoute);
userRouter 
    .route("/userProfile")
    .get(getUser)

// admin specific function
userRouter.use(isAuthorised(["admin"]));
userRouter
    .route("/")
    .get(getAllUsers)

module.exports = userRouter;