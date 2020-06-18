import mongoose, { Document, Schema, Model, model } from "mongoose";
const bcrypt = require("bcryptjs");

export interface UserModel extends mongoose.Document {
    email:string,
    password:string,
}
const UserSchema:Schema = new Schema({
    email: {
        type: String,
        required: [true, 'Please add a name'],
        maxlength: [50, 'Name cannot be more than 50 characters'],
        trime:true,
        unique:false,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please validate email'
        ]
    },
    password: {
        type: String
    },
    userId:{
        type: Schema.Types.ObjectId
    },
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true}
});

// Encrypt password
UserSchema.pre('save', async function(next) {
    const doc = <UserModel>this;
    const salt = await bcrypt.genSalt(10);
    doc.password = await bcrypt.hash(doc.password, salt);
})

export default mongoose.model<UserModel>('User', UserSchema);