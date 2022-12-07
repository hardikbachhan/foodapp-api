const express = require("express");
const app = express();
const userRouter = express.Router();
const { getUser, updateUser, deleteUser, getAllUsers } = require("../controller/userController");
const { signup, login } = require("../controller/authController");
const { protectRoute } = require("../helper");

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
app.use(protectRoute);
userRouter 
    .route("/userProfile")
    .get(getUser)

// admin specific function
app.use(isAuthorised(["admin"]));
userRouter
    .route("/")
    .get(getAllUsers)

module.exports = userRouter;