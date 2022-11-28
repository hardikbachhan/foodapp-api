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

// with query
app.get("/user", (req, res) => {
    console.log(req.query);
    let { name, age } = req.query;
    let filteredData = users.filter(userObj => {
        return userObj.name == name && userObj.age == age;
    });
    res.send(filteredData);
});

app.post("/user", (req, res) => {
    console.log(req.body.Name);
    //then i can put this in db
    user = req.body;
    res.json({
        message: "Data received successfully",
        user: req.body,
    });
});

app.patch("/user", (req, res) => {
    console.log(req.body);
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        user[key] = dataToBeUpdated[key];
    }
    res.json({
        message: "data updated succesfully",
    });
});

app.delete("/user", (req, res) => {
    user = {};
    res.json({
        msg: "user has been deleted",
    });
});

// params
app.get("/user/:id", (req, res) => {
    console.log(req.params.id);
    // let {id} = req.params;
    // let user = db.findOne(id);
    res.json({ userData: req.params });
});

app.listen(5000);