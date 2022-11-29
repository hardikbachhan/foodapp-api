const mongoose = require("mongoose");
const db_link = require('../secrets');
const emailValidator = require("email-validator");
const bcrpyt = require("bcrypt");

mongoose.connect(db_link)
    .then(function (db) {
        console.log("db connected");
        // console.log(db);
    })
    .catch(function (err) {
        console.log(err.message);
    });

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 7,
        validate: function () {
            return this.password === this.confirmPassword;
        }
    },
});

// Learning Hooks
// userSchema.pre("save", function () {
//     console.log("before saving in db");
// });

// userSchema.post("save", function () {
//     console.log("after saving in db");
// });

// hash password before saving in document
userSchema.pre("save", async function () {
    try {
        let salt = await bcrpyt.genSalt();
        let hashedString = await bcrpyt.hash(this.password, salt);
        this.password = hashedString;
        // console.log(hashedString);
    } catch (error) {
        console.log(error.message);
    }
});

// remove confirm password from document.
userSchema.pre("save", function () {
    // console.log("before saving in db");
    this.confirmPassword = undefined;
});

//models
const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
// (async function createUser() {
//     let user = {
//         name: "Rajesh",
//         email: "xyz@gmail.com",
//         password: "12345678",
//         confirmPassword: "12345678"
//     };
//     let data = await userModel.create(user);
//     console.log(data);
// })();