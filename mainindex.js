
const express=require("express");
const app=express();
const path= require("path")
const port=9008;
const mongoose = require('mongoose');
const lists=require("./model/schema");
var methodOverride = require('method-override');
app.use(methodOverride('_method'))

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))

app.use(express.urlencoded({extended:true}));

main().then((res)=>{
    console.log("connection is sucsses")
}).catch((err)=>{
    console.log(err)
})
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbin');
 
}

//main route
app.get("/listings", async(req,res)=>{
    let newlist= await lists.find();
    res.render("./listing/index.ejs",{newlist})
})



//read route in deatail
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let newlist1= await lists.findById(id)
    res.render("./listing/show.ejs",{newlist1})
})


//create route
app.get("/listings/new",(req,res)=>{
    console.log("this is working");
    res.render("./listing/create.ejs")
})


app.post("/listings", async(req,res)=>{
    // let {title,description,image,price,country,location}=req.params;
    let newlisting= new lists(req.body.listing);
       await newlisting.save();
    
       res.redirect("/listings")

 })


 //editing route
 app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let newlist1= await lists.findById(id)
    res.render("./listing/edit.ejs",{newlist1})
 })
 
 app.put("/listing/:id/",async(req,res)=>{
    let {id}=req.params;
    await lists.findByIdAndUpdate(id,{...req.body.listing});

    res.redirect("/listings")
 })

 //detele route
 
 app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await lists.findByIdAndDelete(id);
     res.redirect("/listings");
 })

app.listen(port,(req,res)=>{
    console.log(`your are lisenting to the server ${port}`)
})