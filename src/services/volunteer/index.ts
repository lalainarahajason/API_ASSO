
import * as express from "express";
import Volunteer from "../../models/volunteer" ;
import asyncHandler from "../../middlewares/asyncHandler";

export const findAll = asyncHandler(async (
    req:express.Request, 
    res:express.Response
) => {
    const volunteer = await Volunteer.find({});
    return res.status(200).json({
        success:true,
        volunteer
    })
});
