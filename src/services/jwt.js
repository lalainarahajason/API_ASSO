const jwt = require("jsonwebtoken");
const fs = require('fs')
const privateKey = fs.readFileSync('./env/private.pem', 'utf8');
const decodeToken = (token) => {
    return jwt.verify(token, privateKey, {
      algorithms: ["HS256"],
    });
};

module.exports = {
    decodeToken:decodeToken
}