const adminAuth = (req, res, next) => {
    console.log("Admin Auth checked");

    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("UnAuthorized Request");
    }
    else {
        next();
    }
}
module.exports = { adminAuth };