const express = require("express")
const { validateSignUpData } = require("../utils/validation")
const bcrypt = require("bcrypt")
const User = require("../models/user")

const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
    //Handle DB operation always in try catch block
    try {
        //Validation of Data
        validateSignUpData(req)
        const { firstName, lastName, emailId, password } = req.body
        //Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10)

        //Creating a new instance of the User Model
        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        });
        //Returns you a promise.
        const savedUser = await user.save();
        const token = await savedUser.getJWT();
        //Add the token to cookie and send the response back to the user.
        res.cookie("token", token, {
            expires: new Date(Date.now() + 1 * 3600000) // cookie will be removed after 8 hours
        });
        res.json({ message: "User Added successfully", data: savedUser })
    } catch (err) {
        res.status(400).send(`Error saving the user: ${err.message}`);
    }

})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            //Create a JWT token
            const token = await user.getJWT();
            //Add the token to cookie and send the response back to the user.
            res.cookie("token", token, {
                expires: new Date(Date.now() + 1 * 3600000) // cookie will be removed after 8 hours
            });
            res.send(user)
        }
        else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
})

authRouter.post("/logout", async (req, res) => {
    //Big companies do cleanup activity as well.
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    res.send("Logout Successful")
})

module.exports = authRouter