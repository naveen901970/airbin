
const express=require("express");
const app=express();
const path= require("path")
const port=9008;
const mongoose = require('mongoose');
const lists=require("./model/schema");

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


app.get("/listings", async(req,res)=>{
    let newlist= await lists.find();
    res.render("./listing/index.ejs",{newlist})
})

app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let newlist1=  await lists.findById(id);

    res.render("./listing/show.ejs",{newlist1})
})


app.get("/listings/new",(req,res)=>{
    res.render("./listing/create.ejs")
})



app.listen(port,(req,res)=>{
    console.log(`your are lisenting to the server ${port}`)
})

