
import * as express from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import Volunteer from "../../models/volunteer" ;
import User, { UserModel } from "../../models/user" ;
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const fs = require('fs')
const privateKey = fs.readFileSync('./env/private.pem', 'utf8');

/**
 * Register a volunteer
 * @method POST
 * @property {email} string
 * @property {password} string
 * @property {confirm} string
 * @property {address} string
 * @property {first_name} string
 * @property {last_name} string
 * @property {jobs} string
 * @property {age} string
 * @property {zipcode} string
 * @property {city} string
 */
export const registerVolunteer = asyncHandler(async (
    req:express.Request, 
    res:express.Response, 
): Promise<express.Response> => {
    const userData = req.body;

    if(userData.password != userData.confirm) {
        throw new Error("Password doesn't match");
    }

    if(await isUserExists(userData.email)){
        throw new Error("User already Exits");
    }

    const profile = await createUserProfile(Volunteer, userData);
    const user = await createNewUser(userData, profile._id);
    
    return res.status(200).json({
        success:true,
        user,
        profile
    });
});

/**
 * Register an asso
 * @method POST
 */
export const registerAsso = asyncHandler(async(
    req:express.Request, 
    res:express.Response, 
) => {

})

/**
 * Login
 * @method POST
 * @property {email} string
 * @property {password} string
 */
export const login = asyncHandler(async(
    req:express.Request, 
    res:express.Response, 
) => {

    const {email} = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const user = await User.findOne({email:email}).select("-password").populate({path: 'userId'})
    if(user){
        /**
         * @TODO
         * Make a service for this part
         */
        const token = jwt.sign({ id: user._id }, privateKey, {
            algorithm: 'HS256',
            expiresIn: 86400
        });
        return res.status(200).json({
            success:true,
            token,
            user
        });
    }

})

/**
 * Create New user
 * @param {userData} object : user data object
 * @return user:UserModel
 */
const createNewUser = async(userData, _id):Promise<object> => {
    userData.userId = _id;
    await User.create(userData);
    return await User.find({userId : _id}).select("-password");
};

/**
 * Check if user exists
 * @param {email} string : user email
 * @return boolean
 */
const isUserExists = async(email): Promise<boolean> => {
    const user = await User.findOne({ email : email });
    return user ? true : false;
};

/**
 * Create profile
 * @param {Model} : Model,  user model
 * @return boolean
 */
const createUserProfile = async(Model, data):Promise<any> => {
    return await Model.create(data);
}
