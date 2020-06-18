
import * as express from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import Volunteer from "../../models/volunteer" ;
import User, { UserModel } from "../../models/user" ;

/**
 * Register a volunteer
 * @property name (string)
 */
export const registerVolunteer = asyncHandler(async (
    req:express.Request, 
    res:express.Response, 
) => {
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
