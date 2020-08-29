
import * as express from "express";
import Volunteer from "../../models/volunteer" ;
import User, { UserModel } from "../../models/user" ;
import asyncHandler from "../../middlewares/asyncHandler";
import jwt from "../../services/jwt";
import { validationResult } from "express-validator";

export const findAll = asyncHandler(async (
    req:express.Request, 
    res:express.Response
) => {
    
    const volunteers = await Volunteer.find({});
    return res.status(200).json({
        success:true ,
        volunteers  
    });
});

/**
 * Update volunteer profile
 */
export const updateProfile = asyncHandler(async(
    req:express.Request,
    res:express.Response
)=>{
    const token = req.headers.authorization?.split(' ')[1];
    const payload = jwt.decodeToken(token);
    const data = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // Save user
    const userData = await User.findById(payload.id)
    const userId = userData?.userId || payload.id;
    await Volunteer.findOneAndUpdate({ _id: userId}, data, {new:true})
    const user = await User.findOne({_id:payload.id}).select("-password").populate({path: 'userId'})
    return res.status(200).json({
        success:true,
        user
    });
})