
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
    const user = await createNewUser(userData);

    return res.status(200).json({
        success:true,
        userData
    });
});

/**
 * Create New user
 * @param {userData} object : user data object
 * @return user:UserModel
 */
const createNewUser = async(userData):Promise<UserModel> => {
    
    if(await isUserExists(userData.email)){
        throw new Error("User already Exits");
    }
    const user = await User.create(userData);
    return user;
};

/**
 * Check if user exists
 * @param {email} string : user email
 * @return boolean
 */
const isUserExists = async(email): Promise<boolean> => {
    const user = await User.findOne({ email : email });
    console.log("---------")
    console.log(user)
    console.log("---------")
    return user ? true : false;
};