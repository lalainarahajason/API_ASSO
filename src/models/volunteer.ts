import mongoose, { Document, Schema, Model, model } from "mongoose";
import slugify from "slugify";
import geocoder from "../utils/geocoder";
//const bcrypt = require("bcryptjs");

var VolunteerSchema:Schema = new Schema({
    first_name: {
        type: String,
        required: [true, 'Please add a name'],
        maxlength: [50, 'Name cannot be more than 50 characters'],
        trime:true,
        unique:false,
    },
    last_name: {
        type: String
    },
    slug: String,
    metier: [
        {
            type: Array
        }
    ],
    centreInteret: [
        {
            type: Array,
            required:true
        }
    ],
    phone:{
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters'],
        unique:true
    },
    address:{
        type: String,
        required: [true, 'Please add a valid address']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: false
        },
        coordinates: {
            type: [Number],
            index: '2Dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    age: {
        type: Number,
        description:"Age in numeric value",
        minimum: [18, 'Age must not be under 18'],
        maximum: [99, 'Age must not be upper of 99'],
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true}
});

export default mongoose.model('Volunteer', VolunteerSchema);