const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path  = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main().then((res)=>{
  console.log("connected to database");
}).catch((err)=>{
console.log("error in connecting database");
});


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};


app.put("/listings/:id",async(req,res)=>{
let{id}=req.params;
await Listing.findByIdAndUpdate(id,{...req.body.listing});
res.redirect(`/listings/${id}`);
});
//DELETE route


app.delete("/listings/:id",async(req,res)=>{
  let{id} = req.params;
  let deleteValue = await Listing.findByIdAndDelete(id);
  console.log(deleteValue);
  res.redirect("/listings");
});


app.get("/listings/:id/edit",async(req,res)=>{
  let {id}= req.params;
  let data = await Listing.findById(id);
  console.log(data);
  res.render("listings/edit.ejs",{data});
});


app.post("/listings",(req,res)=>{
  let newListing = new Listing(req.body.listing);
  newListing.save();
  console.log("new data added");
  res.redirect("/listings");
});


app.get("/listings/neww",(req,res)=>{
  res.render("listings/new");
});


app.get("/listings/:id",async(req,res)=>{
let {id}  = req.params;
let one = await Listing.findById(id);
res.render("listings/show",{one});
});


app.get("/listings",async(req,res)=>{
  let alllistings = await Listing.find({})
  res.render("listings/index",{alllistings});
});


app.get("/",(req,res)=>{
    res.send("In the base url");
});


app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
});