const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userModel = require("./models/userModel");

app.use(express.json());
app.use(cookieParser());

let users = [
    {
        id: 1,
        name: "Abhishek",
        age: 33,
    },
    {
        id: 2,
        name: "Hardik",
        age: 23,
    },
    {
        id: 3,
        name: "Nikhil",
        age: 22,
    },
];

const userRouter = express.Router();
const authRouter = express.Router();
app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter
    .route("/")
    //   .get(middleware1,getUser,middleware2)
    .get(middleware1, getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);

userRouter
    .route("/setcookies")
    .get(setCookies);

userRouter
    .route("/getcookies")
    .get(getCookies);

userRouter
    .route("/:name")
    .get(getUserById);

authRouter
    .route("/signup")
    .get(getSignUp)
    .post(postSignUp)

// with query
// app.get("/user", getUser);

// app.post("/user", postUser);

// app.patch("/user", updateUser);

// app.delete("/user", deleteUser);

// params
// app.get("/user/:id");

function middleware1(req, res, next) {
    console.log("midleware 1 called");
    next();
}

// function middleware2(req,res) {
//     console.log("midleware 2 called");
//     res.json({ msg: "user returned" })
// }

async function getUsers(req, res) {
    console.log(req.query);
    let { name, age } = req.query;
    // let filteredData=user.filter(userObj => {
    //     return (userObj.name==name && userObj.age==age)
    // })
    // res.send(filteredData);


    //get all users from db
    let allUsers = await userModel.findOne({ name: "Abhishek" })


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
        let doc = await userModel.findOneAndUpdate({ email: "abc@gmail.com" }, dataToBeUpdated);
        res.json({
            message: "data updated succesfully",
        });
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

async  function deleteUser(req, res) {
    try {
        // user = {};
        let doc = await userModel.deleteOne({email: "abcd@gmail.com"});
        console.log(doc);
        res.json({
            msg: "user has been deleted",
        });
    } catch (error) {

    }
}

function getUserById(req, res) {
    console.log(req.params.name);
    //let {id}=req.params;
    // let user = db.findOne(id);
    res.json({ msg: "user id is ", obj: req.params });
}

function getSignUp(req, res) {
    res.sendFile("/public/index.html", { root: __dirname });
}

async function postSignUp(req, res) {
    // let { email, name, password } = req.body;
    try {
        let data = req.body;
        let user = await userModel.create(data);
        console.log(data);
        res.json({
            msg: "user signed up",
            user
        })
    }
    catch (err) {
        res.json({
            err: err.message
        })
    }
}

function setCookies(req, res) {
    // res.setHeader("Set-Cookie", "isLoggedIn=true");
    res.cookie("isLogginIn", true, {maxAge:30000});
    res.cookie("password", 123456789, {maxAge:30000});
    res.send("cookies have been set");
}

function getCookies(req, res) {
    let cookie = req.cookies;
    console.log(cookie);
    res.send("cookies recieved.")
}

app.listen(5000);