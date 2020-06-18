import mongoose, { Document, Schema, Model, model } from "mongoose";
import slugify from "slugify";
import geocoder from "../utils/geocoder";
const bcrypt = require("bcryptjs");

export interface VolunteerModel extends mongoose.Document {
    first_name:string,
    slug:string,
    address:string,
    location:object,
    age:number,
    zipcode:string
}
const VolunteerSchema:Schema = new Schema({
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
    jobs: [
        {
            type: String,
            enum : ['agriculture','bureautique'],
            default: 'agriculture'
        }
    ],
    points_of_interests: [
        {
            type: Array,
            ref:"interests"
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
    zipcode:{
        type:String
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

// Slugify user first_name
VolunteerSchema.pre('save', function(next) {
    const doc = <VolunteerModel>this;
    doc.slug = slugify(doc.first_name, {lower:true});
    next();
});

// Add age
VolunteerSchema.pre('save', function(next) {
    const doc = <VolunteerModel>this;
    const currentYear = new Date();
    doc.age = currentYear.getUTCFullYear() - doc.age;
    next();
});

// Geocode & create location field
VolunteerSchema.pre('save', async function(next) {
    const doc = <VolunteerModel>this;
    const loc = await geocoder.geocode(doc.address);
    doc.location = {
        type:'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipCode,
        country: loc[0].countryCode,
    };
    doc.address = undefined || loc[0].address;
    next();
})


export default mongoose.model<VolunteerModel>('Volunteer', VolunteerSchema);