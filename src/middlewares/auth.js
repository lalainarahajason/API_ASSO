const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt    = require("bcryptjs");

/**
 * Middleware to login user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        
        if(user){
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if(!isPasswordMatch){
                return res.status(500).json({ success:false });
            }
        } else {
            return res.status(500).json({ success:false });
        }
    
        next();

    } catch (error) {
        throw new Error(error);
    }
};

module.exports = authUser;