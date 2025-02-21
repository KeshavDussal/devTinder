const validator = require("validator")
const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Please enter firstname and lastname");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Please enter a valid Email id");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "gender", "age", "about", "skills"];
    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field))
    return isEditAllowed;
}

module.exports = { validateSignUpData, validateEditProfileData }