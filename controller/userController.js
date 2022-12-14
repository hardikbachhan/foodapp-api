const userModel = require("../models/userModel");

module.exports.getUser = async function (req, res) {
    try {
        let id = req.id;
        let user = await userModel.findById(id);
        res.json({ user });
    } catch (error) {
        res.json({
            msg: error.message,
        })
    }
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

module.exports.getAllUsers = async function (req, res) {
    try {
        let allUsers = await userModel.find();
        res.json({ users: allUsers });
    } catch (error) {
        res.json({
            msg: error.message,
        })
    }
}