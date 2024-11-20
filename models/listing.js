const mongoose = require("mongoose");


const listingschema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        filename:{
            type:String,
            default:"Anything",
        },
        url:{
            type:String,
            default:"https://i.pinimg.com/736x/94/c8/23/94c8235006228b5661838c226bd208d7.jpg",
            set:(v)=> v===""?"https://i.pinimg.com/736x/94/c8/23/94c8235006228b5661838c226bd208d7.jpg":v,
       
        }
         },
    price:Number,
    location:String,
    country:String,
});


const Listing = mongoose.model("Listing",listingschema);


module.exports = Listing;