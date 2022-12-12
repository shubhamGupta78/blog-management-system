const { object } = require('joi');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/bms');
const blogPostSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    comments:[
        {
            email:String,
            comment:String
        }
    ]
    
});

const blogPost= mongoose.model('blogPost',blogPostSchema);
module.exports=blogPost;

