require('dotenv').config();

const jwt = require('jsonwebtoken');
const secretKey = process.env.ACCESS_TOKEN_SECRET;

function generateToken( dataUser = {} ) {
    let token = jwt.sign(dataUser, secretKey);
    return token;
};

function getUserData(token) {
    let decoded = jwt.verify(token, secretKey);
    return decoded;
};

module.exports = { generateToken, getUserData };

// const jwt = require('jsonwebtoken');
// require('dotenv').config()

// const authentication = async (req, res, next)=>{
//     const authHeader = req.headers['authorization']
//     const token= authHeader && authHeader.split(' ')[1]
//     if(token==null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
//         if(err) return res.sendStatus(403)
//         req.user = user
//         next()
//     })
// }

// module.exports = {
//     authentication
// }
