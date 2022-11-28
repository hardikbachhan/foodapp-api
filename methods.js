const express = require("express");
const app = express();
app.use(express.json());
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
app.use("/user", userRouter);

userRouter
    .route("/")
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);

userRouter
    .route("/:name")
    .get(getUserById);

// with query
// app.get("/user", getUser);

// app.post("/user", postUser);

// app.patch("/user", updateUser);

// app.delete("/user", deleteUser);

// params
// app.get("/user/:id");

function getUser(req, res) {
    console.log(req.query);
    let { name, age } = req.query;
    let filteredData = users.filter((userObj) => {
        return userObj.name == name && userObj.age == age;
    });
    res.send(filteredData);
};

function postUser(req, res) {
    console.log(req.body.Name);
    //then i can put this in db
    user = req.body;
    res.json({
        message: "Data received successfully",
        user: req.body,
    });
};

function updateUser(req, res) {
    console.log(req.body);
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        user[key] = dataToBeUpdated[key];
    }
    res.json({
        message: "data updated succesfully",
    });
};

function deleteUser(req, res) {
    user = {};
    res.json({
        msg: "user has been deleted",
    });
};

function getUserById(req, res) {
    console.log(req.params.id);
    // let {id} = req.params;
    // let user = db.findOne(id);
    res.json({ userData: req.params });
};

app.listen(5000);