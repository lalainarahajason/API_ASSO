
import * as express from "express";
import Volunteer from "../../models/volunteer" ;
import User, { UserModel } from "../../models/user" ;
import asyncHandler from "../../middlewares/asyncHandler";

export const findAll = asyncHandler(async (
    req:express.Request, 
    res:express.Response
) => {
    
   return res.status(200).json({
        success:true    
    });
});