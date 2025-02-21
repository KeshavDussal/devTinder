const express = require("express")
const { userAuth } = require("../middlewares/auth")
const profileRouter = express.Router();
const { validateEditProfileData } = require("../utils/validation")

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    console.log("req.user" + req.user)
    try {
        const user = req.user;

        res.send(user)
    } catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }

})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit request")
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))
        await loggedInUser.save();
        res.json({ message: `${loggedInUser.firstName}, your profile was updated successfully`, data: loggedInUser })
    } catch (error) {
        res.status(400).send("ERROR:" + error.message)
    }
})


module.exports = profileRouter