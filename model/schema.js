const mongoose = require('mongoose');


const listingschema= new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://th.bing.com/th/id/OIP.mMfDbfeirUydQoXiSlgA9gAAAA?rs=1&pid=ImgDetMain",
        set:(v)=>
            v===""?"https://th.bing.com/th/id/OIP.mMfDbfeirUydQoXiSlgA9gAAAA?rs=1&pid=ImgDetMain":v
        },
        price:String,
        location:String,
        country:String,

});

const lists=mongoose.model("lists",listingschema)

module.exports=lists;