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
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        // console.log(doc);
        res.json({
            msg: "user has been deleted",
            user
        });
    } catch (error) { 
        res.json({
            msg: error.message
        });
    }
}

module.exports.getAllUsers = function (req, res) {
    console.log(req.params.name);
    //let {id}=req.params;
    // let user = db.findOne(id);
    res.json({ msg: "user id is ", obj: req.params });
}