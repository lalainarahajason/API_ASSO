
import * as express from "express";
import asyncHandler from "../../middlewares/asyncHandler";

/**
 * Register a volunteer
 * @property name (string)
 */
export const registerVolunteer = asyncHandler(async (
    req:express.Request, 
    res:express.Response, 
) => {
    return res.status(200).json({
        success:true,
        body:req.body
    })
});