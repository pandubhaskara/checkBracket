const { getUserData } = require("../helpers/jwt"); 

function isAdmin (req, res, next) {
    const userData = getUserData(req.headers.token);
    const userRole = userData.role;
    // const token = req.headers.token;
    if (userRole != "admin") {
        return res.status(401).json({status: "failed", message : "Sorry, only Admin can do this"})
    } else {
        return res.status(401).json({
            status: "failed",
            message: error.message || "Unauthorized, invalid token!",
        });
    };
    next();
}

module.exports = { isAdmin };