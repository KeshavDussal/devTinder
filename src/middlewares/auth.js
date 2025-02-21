const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        //Read the token from req cookies
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token is not valid!!!");
        }
        const decodedObj = await jwt.verify(token, "DEV@Tinder$790")
        const { _id } = decodedObj;
        //Find the user.
        const user = await User.findById(_id)
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        //next - used to move to the request handler
        next();
    } catch (err) {
        res.status(400).send("ERROR:" + err.msg)
    }
}
module.exports = { userAuth };