import mongoose, { Document, Schema, Model, model } from "mongoose";

export interface InterestsModel extends mongoose.Document {
   item:string,
   slug:string,
   order:number
}

// Parent of interests
const InterestParentSchema:Schema = new Schema({
    item:String,
    slug:String,
    order:Number
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true}
});

// Child of interests
const InterestChildSchema:Schema = new Schema({
    item:String,
    slug:String,
    parent:String,
    order:Number
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true}
});

const ChildOfInterest = mongoose.model<InterestsModel>('Child', InterestChildSchema);
const ParentOfInterest = mongoose.model<InterestsModel>('Parent', InterestParentSchema);

module.exports = {
    ChildOfInterest,
    ParentOfInterest
}