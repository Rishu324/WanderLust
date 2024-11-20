const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

main().then((res)=>{
console.log(" connected to database");
}).catch((err)=>{
console.log("error in connecting database");
});

const initDB = async()=>{
await Listing.deleteMany({});
await Listing.insertMany(initdata.data);
console.log("data was initialized")};
initDB();